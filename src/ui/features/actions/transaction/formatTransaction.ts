import { isArray } from "lodash-es";
import { Call } from "starknet";
import { guildStore } from "../../../../shared/storage/guilds";
import { getSelectorFromName } from "starknet/dist/utils/hash";

export const formatTransaction = (transactions: any) => {
  // const currentGuild = await guildStore.getSelectedAccount();
  const transactionsArray: Call[] = isArray(transactions)
    ? transactions
    : [transactions];
  const currentGuild = guildStore[guildStore.length - 1];
  const guildAddress = currentGuild.account.address;
  const newTransactionArray = <any[]>[];
  for (var i = 0; i < transactionsArray.length; i++) {
    newTransactionArray.push(transactionsArray[i].contractAddress);
    newTransactionArray.push(
      getSelectorFromName(transactionsArray[i].entrypoint)
    );
    newTransactionArray.push(...[transactionsArray[i].calldata]);
  }
  const formattedTransaction = {
    calldata: newTransactionArray,
    entrypoint: "execute_transactions",
    contractAddress: guildAddress,
  };
  return formattedTransaction;
};
