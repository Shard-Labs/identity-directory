import BigNumber from "bignumber.js";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3FromSource } from "@polkadot/extension-dapp";
import HTTPClient from "@/lib/HTTPClient";

import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { Network, Notification, State } from "./state";

function calcPaginationState(page: number, sizePerPage: number): string {
  return `${(page - 1) * sizePerPage + 1}-${page * sizePerPage}`;
}

async function getAddressFromIndex(
  api: ApiPromise,
  index: string
): Promise<any> {
  try {
    const accountData = await api.query.indices.accounts(index);
    const account = accountData.toHuman();
    if (Array.isArray(account)) {
      return account[0];
    }
  } catch (error) {
    return "";
  }
}

export enum ActionTypes {
  SetWallet = "SET_WALLET",
  GetIdentity = "GET_IDENTITY",
  SearchIdentity = "SEARCH_IDENTITY",
  GetIdentityList = "GET_IDENTITY_LIST",
  SetNetwork = "SET_NETWORK",
  SetNetworkProvider = "SET_NETWORK_PROVIDER",
  ConnectToNetwork = "CONNECT_TO_NETWORK",
  SetNotification = "SET_NOTIFICATION",
  SetPaginationPage = "SET_PAGINATION_PAGE",
  SetPaginationSize = "SET_PAGINATION_SIZE",
  SendTokens = "SEND_TOKENS"
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.SetWallet](
    context: ActionAugments,
    wallet: InjectedAccountWithMeta
  ): void;
  [ActionTypes.GetIdentity](context: ActionAugments, address: string): void;
  [ActionTypes.SearchIdentity](
    context: ActionAugments,
    query: string
  ): Promise<boolean>;
  [ActionTypes.GetIdentityList](context: ActionAugments): void;
  [ActionTypes.SetNetwork](context: ActionAugments, network: Network): void;
  [ActionTypes.SetNetworkProvider](
    context: ActionAugments,
    provider: string
  ): void;
  [ActionTypes.ConnectToNetwork](context: ActionAugments): Promise<boolean>;
  [ActionTypes.SetNotification](
    context: ActionAugments,
    notification: Notification
  ): void;
  [ActionTypes.SetPaginationPage](context: ActionAugments, page: number): void;
  [ActionTypes.SetPaginationSize](context: ActionAugments, page: number): void;
  [ActionTypes.SendTokens](
    context: ActionAugments,
    payload: { amount: number; address: string }
  ): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetWallet]({ state, commit }, wallet) {
    commit(MutationType.SetWallet, wallet);

    const { address } = wallet;
    if (state.network) {
      const { api } = state.network;
      let identity: any;
      if (api) {
        identity = await api.derive.accounts.identity(address);
      }
      const judgements: any[] = [];
      if (identity) {
        identity.judgements.forEach((el: any) => {
          judgements.push(...Object.keys(el[1].toHuman()));
          identity.judgements = judgements;
        });
        commit(MutationType.SetMyIdentity, identity);
      }
    }
  },
  async [ActionTypes.GetIdentity]({ commit, state }, address) {
    if (state.network) {
      commit(MutationType.SetIdentity, null);
      commit(MutationType.SetIdentityLoading, true);
      const { api } = state.network;
      let identity: any, balances: any, decimals: any;
      if (api) {
        identity = await api.derive.accounts.identity(address);
        balances = await api.derive.balances.account(address);
        decimals = api.registry.chainDecimals;
        decimals = new BigNumber(decimals).toNumber();
      }
      if (balances) {
        const { freeBalance, reservedBalance, frozenMisc } = balances;
        const base = new BigNumber(10).pow(decimals);
        identity.balance = new BigNumber(freeBalance.toHex())
          .plus(reservedBalance.toHex())
          .div(base)
          .toFixed(2);
        identity.freeBalance = new BigNumber(freeBalance.toHex())
          .div(base)
          .toFixed(2);
        identity.availableBalance = new BigNumber(freeBalance.toHex())
          .minus(frozenMisc.toHex())
          .multipliedBy(state.network.minAmount)
          .toFixed(2);
        identity.reservedBalance = new BigNumber(reservedBalance.toHex())
          .div(base)
          .toFixed(2);
        identity.lockedBalance = new BigNumber(frozenMisc.toHex())
          .div(base)
          .toFixed(2);
      }
      const judgements: any[] = [];
      if (identity) {
        identity.judgements.forEach((el: any) => {
          judgements.push(...Object.keys(el[1].toHuman()));
          identity.judgements = judgements;
        });
        commit(MutationType.SetIdentity, identity);
      }
      commit(MutationType.SetIdentityLoading, false);
    }
  },
  async [ActionTypes.SearchIdentity]({ state }, query) {
    if (state.network) {
      const { api } = state.network;
      let identity: any;
      let accountId: any;
      if (api) {
        accountId = await getAddressFromIndex(api, query);
        try {
          if (accountId) {
            identity = await api.derive.accounts.identity(accountId);
          } else {
            identity = await api.derive.accounts.identity(query);
          }
        } catch (ex) {
          return true;
        }
      }
      if (!identity) {
        return "";
      }
      return accountId || query;
    }
    return "";
  },
  async [ActionTypes.GetIdentityList]({ commit, state }) {
    const { network } = state;
    if (network) {
      commit(MutationType.SetIdentityList, []);
      commit(MutationType.SetIdentityGridList, []);
      commit(MutationType.SetIdentityListLoading, true);
      const { url } = network;
      const {
        pagination: { page, sizePerPage }
      } = state;
      try {
        if (!url) {
          return;
        }
        const { data: list } = await HTTPClient.get(
          `${url}&page[number]=${page}&page[size]=${sizePerPage + 3}`
        );
        const identityListGrid = list.slice(0, 3);
        list.splice(0, 3);
        commit(MutationType.SetIdentityListLoading, false);
        commit(MutationType.SetIdentityGridList, identityListGrid);
        commit(MutationType.SetIdentityList, list);
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  async [ActionTypes.SetNetwork]({ commit }, network) {
    commit(MutationType.SetNetwork, network);
  },
  async [ActionTypes.SetNetworkProvider]({ commit }, provider) {
    commit(MutationType.SetNetworkProvider, provider);
  },
  async [ActionTypes.ConnectToNetwork]({ commit, state, dispatch }) {
    dispatch(ActionTypes.SetPaginationPage, 1);
    const { network } = state;
    try {
      if (network) {
        const provider = new WsProvider(network.wsProvider);
        const api = await ApiPromise.create({ provider });
        const { isConnected } = api;
        if (isConnected) {
          let chain = "";
          if (network.custom) {
            chain = (await api.rpc.system.chain()).toHuman().toLowerCase();
            if (!chain) {
              commit(MutationType.SetIdentityListLoading, false);
              dispatch(ActionTypes.SetNotification, {
                show: true,
                message:
                  "Can't display Identities List on selected Custom Node",
                type: "warning"
              });
              return true;
            }
          }
          commit(MutationType.SetNetworkConnected, { isConnected, chain });
          commit(MutationType.SetNetworkAPI, api);
          const properties = (await api.rpc.system.properties()).toHuman();
          const { tokenSymbol } = properties;
          if (
            tokenSymbol &&
            Array.isArray(tokenSymbol) &&
            tokenSymbol.length > 0
          ) {
            commit(MutationType.SetToken, tokenSymbol.shift() as string);
            let decimals: any;
            decimals = api.registry.chainDecimals;
            decimals = new BigNumber(decimals).toNumber();
            const minAmount = new BigNumber(1).div(
              new BigNumber(10).pow(decimals).toString()
            );
            commit(
              MutationType.SetNetworkMinAmount,
              minAmount.toFixed(decimals)
            );
            commit(MutationType.SetNetworkDecimals, decimals);
          }
          if (api && state.wallet) {
            const { address } = state.wallet;
            const identity = await api.derive.accounts.identity(address);
            if (identity && Object.keys(identity).length > 1) {
              identity.judgements = [];
              commit(MutationType.SetMyIdentity, identity);
            }
          }
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Connected to Network/Node",
            type: "success"
          });
        } else {
          commit(MutationType.SetIdentityListLoading, false);
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Unable To connect to Network/Node",
            type: "danger"
          });
        }
      } else {
        commit(MutationType.SetIdentityListLoading, false);
        dispatch(ActionTypes.SetNotification, {
          show: true,
          message: "Network Not Selected",
          type: "error"
        });
      }
    } catch (ex) {
      dispatch(ActionTypes.SetNotification, {
        show: true,
        message: "Unable To connect to Network/Node",
        type: "error"
      });
    }
    return true;
  },
  async [ActionTypes.SetNotification]({ commit }, notification) {
    commit(MutationType.SetNotification, notification);
  },
  async [ActionTypes.SetPaginationPage]({ commit, state, dispatch }, page) {
    const { sizePerPage } = state.pagination;
    const overview = calcPaginationState(page, sizePerPage);
    commit(MutationType.SetPaginationPage, page);
    commit(MutationType.SetPaginationState, overview);
    dispatch(ActionTypes.GetIdentityList);
  },
  async [ActionTypes.SetPaginationSize](
    { commit, state, dispatch },
    sizePerPage
  ) {
    const { page } = state.pagination;
    const overview = calcPaginationState(page, sizePerPage);
    commit(MutationType.SetPaginationSize, sizePerPage);
    commit(MutationType.SetPaginationState, overview);
    dispatch(ActionTypes.GetIdentityList);
  },
  async [ActionTypes.SendTokens]({ state, dispatch }, { address, amount }) {
    const { network, wallet } = state;
    if (network && network.api) {
      if (wallet) {
        const planckAmount = new BigNumber(amount).multipliedBy(
          new BigNumber(10).pow(network.decimals)
        );
        const transfer = network.api.tx.balances.transfer(
          address,
          planckAmount.toNumber()
        );
        const injector = await web3FromSource(wallet.meta.source);
        transfer
          .signAndSend(
            wallet.address,
            { signer: injector.signer },
            ({ status }) => {
              if (status.isInBlock) {
                dispatch(ActionTypes.SetNotification, {
                  type: "success",
                  show: true,
                  message: `Completed at block hash #${status.asInBlock.toString()}`
                });
              } else {
                dispatch(ActionTypes.SetNotification, {
                  type: "warning",
                  show: true,
                  message: `Current status: ${status.type}`
                });
              }
            }
          )
          .catch(() => {
            dispatch(ActionTypes.SetNotification, {
              type: "error",
              show: true,
              message: "Transaction Failed"
            });
          });
      } else {
        dispatch(ActionTypes.SetNotification, {
          type: "error",
          show: true,
          message: "Account Not Connected!"
        });
      }
    } else {
      dispatch(ActionTypes.SetNotification, {
        type: "error",
        show: true,
        message: "Not Connected the Network"
      });
    }
  }
};
