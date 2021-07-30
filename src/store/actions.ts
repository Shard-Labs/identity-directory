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
    address: string
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
      let identity;
      if (api) {
        identity = await api.derive.accounts.identity(address);
      }
      if (identity && Object.keys(identity).length > 1) {
        const verification =
          identity.judgements[0][identity.judgements[0].length - 1].toString();
        /* @ts-ignore */
        if (verification) {
          /* @ts-ignore */
          identity.judgements = verification;
        }
        commit(MutationType.SetMyIdentity, identity);
      }
    }
  },
  async [ActionTypes.GetIdentity]({ commit, state }, address) {
    if (state.network) {
      commit(MutationType.SetIdentity, null);
      commit(MutationType.SetIdentityLoading, true);
      const { api } = state.network;
      let identity: any, balances: any;
      if (api) {
        identity = await api.derive.accounts.identity(address);
        balances = await api.derive.balances.account(address);
      }
      if (balances) {
        const { freeBalance, frozenMisc } = balances;
        /* @ts-ignore */
        identity.balance = new BigNumber(freeBalance.toHex())
          .minus(frozenMisc.toHex())
          .multipliedBy(state.network.minAmount)
          .toFixed(2);
      }
      /* @ts-ignore */
      const judgements = [];
      if (identity) {
        identity.judgements.forEach((el: any) => {
          /* @ts-ignore */
          judgements.push(...Object.keys(el[1].toHuman()));
          /* @ts-ignore */
          identity.judgements = judgements;
        });
        commit(MutationType.SetIdentity, identity);
      }
      commit(MutationType.SetIdentityLoading, false);
    }
  },
  async [ActionTypes.SearchIdentity]({ state }, address) {
    if (state.network) {
      const { api } = state.network;
      let identity: any;
      if (api) {
        identity = await api.derive.accounts.identity(address);
      }
      if (identity) {
        return true;
      }
      return false;
    }
    return false;
  },
  async [ActionTypes.GetIdentityList]({ commit, state, dispatch }) {
    const { network } = state;
    if (network) {
      if (network.custom) {
        commit(MutationType.SetIdentityListLoading, false);
        dispatch(ActionTypes.SetNotification, {
          show: true,
          message: "Can't display Identities List on custom Node",
          type: "warning"
        });
        return true;
      }
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
          commit(MutationType.SetNetworkConnected, isConnected);
          commit(MutationType.SetNetworkAPI, api);
          const properties = (await api.rpc.system.properties()).toHuman();
          const { tokenSymbol } = properties;
          if (Array.isArray(tokenSymbol) && tokenSymbol.length > 0) {
            /* @ts-ignore */
            commit(MutationType.SetToken, tokenSymbol.shift());
            if (tokenSymbol[0] === "DOT") {
              commit(MutationType.SetNetworkMinAmount, 0.0000000001);
            } else {
              commit(MutationType.SetNetworkMinAmount, 0.000000000001);
            }
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
        const transfer = network.api.tx.balances.transfer(address, amount);
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
