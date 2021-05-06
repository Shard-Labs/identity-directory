import { MutationTree } from "vuex";
import { State, Identity, Notification, Network } from "./state";
import { Constants } from "../lib/constants";
import { ApiPromise } from "@polkadot/api";

export enum MutationType {
  SetIdentity = "SET_IDENTITY",
  SetIdentityList = "SET_IDENTITY_LIST",
  SetIdentityListLoading = "SET_IDENTITY_LIST_LOADING",
  SetIdentityGridList = "SET_ISET_IDENTITY_GRID_LIST",
  SetNetwork = "SET_NETWORK",
  SetNetworkConnected = "SET_NETWORK_CONNECTED",
  SetNetworkAPI = "SET_NETWORK_API",
  SetNetworkName = "SET_NETWORK_NAME",
  SetNotification = "SET_NOTIFICATION",
  SetPaginationPage = "SET_PAGINATION_PAGE",
  SetPaginationSize = "SET_PAGINATION_SIZE",
  SetPaginationState = "SET_PAGINATION_STATE"
}

export type Mutations = {
  [MutationType.SetIdentity](state: State, identity: Identity): void;
  [MutationType.SetIdentityList](state: State, list: Identity[]): void;
  [MutationType.SetIdentityListLoading](state: State, loading: boolean): void;
  [MutationType.SetIdentityGridList](state: State, list: Identity[]): void;
  [MutationType.SetNetwork](state: State, item: Network): void;
  [MutationType.SetNetworkConnected](state: State, connected: boolean): void;
  [MutationType.SetNetworkAPI](state: State, api: ApiPromise): void;
  [MutationType.SetNotification](state: State, item: Notification): void;
  [MutationType.SetPaginationPage](state: State, page: number): void;
  [MutationType.SetPaginationSize](state: State, sizePerPage: number): void;
  [MutationType.SetPaginationState](state: State, overview: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetIdentity](state, identity) {
    state.identity = identity;
  },
  [MutationType.SetIdentityList](state, list) {
    state.identityList = list;
  },
  [MutationType.SetIdentityListLoading](state, loading) {
    state.identityListLoading = loading;
  },
  [MutationType.SetIdentityGridList](state, list) {
    state.identityGridList = list;
  },
  [MutationType.SetNetwork](state, network) {
    state.network = network;
  },
  [MutationType.SetNetworkConnected](state, connected) {
    if (state.network) {
      state.network.connected = connected;
      state.network.url = `${Constants.explorerDomain}/${state.network.title.toLowerCase()}/account?filter[has_identity]=1`
    }
  },
  [MutationType.SetNetworkAPI](state, api) {
    if (state.network) {
      state.network.api = api;
    }
  },
  [MutationType.SetNotification](state, notification) {
    state.notification = notification;
  },
  [MutationType.SetPaginationPage](state, page) {
    state.pagination.page = page;
  },
  [MutationType.SetPaginationSize](state, sizePerPage) {
    state.pagination.sizePerPage = sizePerPage;
  },
  [MutationType.SetPaginationState](state, overview) {
    state.pagination.state = overview;
  }
};
