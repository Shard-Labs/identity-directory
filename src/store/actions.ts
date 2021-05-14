import { ApiPromise, WsProvider } from "@polkadot/api";
import HTTPClient from "@/lib/HTTPClient";

import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { Network, Notification, State } from "./state";

function calcPaginationState(page: number, sizePerPage: number): string {
  return `${(page - 1) * sizePerPage + 1}-${page * sizePerPage}`;
}

export enum ActionTypes {
  GetIdentity = "GET_IDENTITY",
  GetIdentityList = "GET_IDENTITY_LIST",
  SetNetwork = "SET_NETWORK",
  SetNetworkProvider = "SET_NETWORK_PROVIDER",
  ConnectToNetwork = "CONNECT_TO_NETWORK",
  SetNotification = "SET_NOTIFICATION",
  SetPaginationPage = "SET_PAGINATION_PAGE",
  SetPaginationSize = "SET_PAGINATION_SIZE"
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GetIdentity](context: ActionAugments, address: string): void;
  [ActionTypes.GetIdentityList](context: ActionAugments): void;
  [ActionTypes.SetNetwork](context: ActionAugments, network: Network): void;
  [ActionTypes.ConnectToNetwork](context: ActionAugments): Promise<boolean>;
  [ActionTypes.SetNotification](
    context: ActionAugments,
    notification: Notification
  ): void;
  [ActionTypes.SetPaginationPage](context: ActionAugments, page: number): void;
  [ActionTypes.SetPaginationSize](context: ActionAugments, page: number): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetIdentity]({ commit, state }, address) {
    if (state.network) {
      const { api } = state.network;
      const identity = await api?.derive.accounts.identity(address);
      const balances = await api?.derive.balances.account(address);
      // const votes = await api?.query.society.votes(address);

      console.log(identity);
      // console.log(votes);
      console.log(balances);
      console.log(balances?.freeBalance.toHuman());
      console.log(balances?.frozenFee.toHuman());
      console.log(balances?.reservedBalance.toHuman());
      console.log(balances?.votingBalance.toHuman());
      if (balances) {
        /* @ts-ignore */
        commit(MutationType.SetIdentity, identity);
      }
    }
  },
  async [ActionTypes.GetIdentityList]({ commit, state }) {
    if (state.network) {
      commit(MutationType.SetIdentityList, []);
      commit(MutationType.SetIdentityListLoading, true);
      const {
        network: { url },
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
    commit(MutationType.SetIdentityList, []);
    commit(MutationType.SetIdentityGridList, []);
    dispatch(ActionTypes.SetPaginationPage, 1);
    const { network } = state;
    try {
      if (network) {
        const provider = new WsProvider(network.wsProvider);
        const api = await ApiPromise.create({ provider });
        const { isConnected } = api;
        if (isConnected && network.custom) {
          commit(MutationType.SetIdentityListLoading, false);
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Can't display Identities List on custom Node",
            type: "warning"
          });
          return true;
        }
        if (isConnected) {
          commit(MutationType.SetNetworkConnected, isConnected);
          commit(MutationType.SetNetworkAPI, api);
          dispatch(ActionTypes.GetIdentityList);
          const properties = (await api.rpc.system.properties()).toHuman();
          console.log(properties);
          /* @ts-ignore */
          const { tokenSymbol } = properties;
          if (Array.isArray(tokenSymbol) && tokenSymbol.length > 0) {
            /* @ts-ignore */
            commit(MutationType.SetToken, tokenSymbol.shift());
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
  }
};
