import { ApiPromise, WsProvider } from "@polkadot/api";
import HTTPClient from "@/lib/HTTPClient";

import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { Identity, Network, Notification, State } from "./state";

function calcPaginationState(page: number, sizePerPage: number): string {
  return `${(page - 1) * sizePerPage + 1}-${page * sizePerPage}`;
}

export enum ActionTypes {
  GetIdentity = "GET_IDENTITY",
  GetIdentityList = "GET_IDENTITY_LIST",
  SetNetwork = "SET_NETWORK",
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
  [ActionTypes.GetIdentity](context: ActionAugments): void;
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
  async [ActionTypes.GetIdentity]({ commit, state }) {
    if (state.network) {
      commit(MutationType.SetIdentity, {
        id: "",
        type: "account",
        attribute: {}
      });
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
  async [ActionTypes.ConnectToNetwork]({ commit, state, dispatch }) {
    const { network } = state;
    try {
      if (network) {
        const provider = new WsProvider(network.wsProvider);
        const api = await ApiPromise.create({ provider });
        const { isConnected } = api;

        if (isConnected) {
          commit(MutationType.SetNetworkConnected, isConnected);
          commit(MutationType.SetNetworkAPI, api);
          dispatch(ActionTypes.GetIdentityList);
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Connected to Network/Node",
            type: "success"
          });
        } else {
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Unable To connect to Network/Node",
            type: "danger"
          });
        }
      } else {
        dispatch(ActionTypes.SetNotification, {
          show: true,
          message: "Network Not Selected",
          type: "danger"
        });
      }
    } catch (ex) {
      dispatch(ActionTypes.SetNotification, {
        show: true,
        message: "Unable To connect to Network/Node",
        type: "danger"
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
