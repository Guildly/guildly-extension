import { difference } from "lodash-es";

import { PreAuthorisationMessage } from "../shared/messages/PreAuthorisationMessage";
import {
  isPreAuthorized,
  preAuthorizeStore,
} from "../shared/preAuthorizations";
// import { addTab, sendMessageToHost } from "./activeTabs"
import { UnhandledMessage } from "./background";
import { HandleMessage } from "./background";
import { openUi } from "./openUi";
import { addTab, sendMessageToHost } from "./activeTabs";

preAuthorizeStore.subscribe(async (_, changeSet) => {
  const removed = difference(
    changeSet.oldValue ?? [],
    changeSet.newValue ?? []
  );
  for (const preAuthorization of removed) {
    await sendMessageToHost(
      { type: "DISCONNECT_ACCOUNT" },
      preAuthorization.host
    );
  }
});

export const handlePreAuthorizationMessage: HandleMessage<
  PreAuthorisationMessage
> = async ({
  msg,
  sender,
  background: { guild, actionQueue },
  sendToTabAndUi,
}) => {
  switch (msg.type) {
    case "CONNECT_DAPP": {
      const selectedAccount = await guild.getSelectedAccount();
      if (sender.tab?.id) {
        addTab({
          id: sender.tab?.id,
          host: msg.data.host,
        });
      }
      if (!selectedAccount) {
        openUi();
        return;
      }
      const isAuthorized = await isPreAuthorized(
        selectedAccount,
        msg.data.host
      );

      // if (sender.tab?.id) {
      //   addTab({
      //     id: sender.tab?.id,
      //     host: msg.data.host,
      //   });
      // }

      if (!isAuthorized) {
        await actionQueue.push({
          type: "CONNECT_DAPP",
          payload: { host: msg.data.host },
        });
      }

      console.log(isAuthorized);
      if (isAuthorized && selectedAccount?.address) {
        return sendToTabAndUi({
          type: "CONNECT_GUILD_RES",
          data: selectedAccount,
        });
      }

      return openUi();
    }

    case "IS_PREAUTHORIZED": {
      const selectedAccount = await guild.getSelectedAccount();

      if (!selectedAccount) {
        return sendToTabAndUi({ type: "IS_PREAUTHORIZED_RES", data: false });
      }

      const valid = await isPreAuthorized(selectedAccount, msg.data);
      return sendToTabAndUi({ type: "IS_PREAUTHORIZED_RES", data: valid });
    }
  }

  throw new UnhandledMessage();
};
