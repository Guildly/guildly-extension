import browser from "webextension-polyfill";

import { ActionItem } from "../shared/actionQueue/types";
import { MessageType } from "../shared/messages";
import { Queue } from "./actionQueue";
import { MessagingKeys } from "./keys/messagingKeys";
// import { TransactionTracker } from "./transactions/tracking";
import { Guild } from "./guild";

export interface BackgroundService {
  guild: Guild;
  // transactionTracker: TransactionTracker;
  actionQueue: Queue<ActionItem>;
}

export class UnhandledMessage extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, UnhandledMessage.prototype);
  }
}

interface HandlerParams<T> {
  msg: T;
  sender: browser.runtime.MessageSender;
  background: BackgroundService;
  messagingKeys: MessagingKeys;
  sendToTabAndUi: (msg: MessageType) => Promise<void>;
}

export type HandleMessage<T> = (params: HandlerParams<T>) => Promise<unknown>;
