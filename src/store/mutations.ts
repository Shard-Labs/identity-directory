import { MutationTree } from "vuex";
import { State, Identity, IdentityEl, Notification, Network } from "./state";
import { Constants } from "../lib/constants";
import { ApiPromise } from "@polkadot/api";
import { DeriveAccountRegistration } from "@polkadot/api-derive/types";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

export enum MutationType {
  SetWallet = "SET_WALLET",
  SetMyIdentity = "SET_MY_IDENTITY",
  SetIdentity = "SET_IDENTITY",
  SetIdentityList = "SET_IDENTITY_LIST",
  SetIdentityListLoading = "SET_IDENTITY_LIST_LOADING",
  SetIdentityGridList = "SET_ISET_IDENTITY_GRID_LIST",
  SetNetwork = "SET_NETWORK",
  SetToken = "SET_TOKEN",
  SetNetworkProvider = "SET_NETWORK_PROVIDER",
  SetNetworkConnected = "SET_NETWORK_CONNECTED",
  SetNetworkMinAmount = "SET_NETWORK_MIN_AMOUNT",
  SetNetworkAPI = "SET_NETWORK_API",
  SetNetworkName = "SET_NETWORK_NAME",
  SetNotification = "SET_NOTIFICATION",
  SetPaginationPage = "SET_PAGINATION_PAGE",
  SetPaginationSize = "SET_PAGINATION_SIZE",
  SetPaginationState = "SET_PAGINATION_STATE"
}

export type Mutations = {
  [MutationType.SetWallet](state: State, wallet: InjectedAccountWithMeta): void;
  [MutationType.SetIdentity](
    state: State,
    identity: Identity | DeriveAccountRegistration
  ): void;
  [MutationType.SetMyIdentity](
    state: State,
    identity: Identity | DeriveAccountRegistration
  ): void;
  [MutationType.SetIdentityList](state: State, list: IdentityEl[]): void;
  [MutationType.SetIdentityListLoading](state: State, loading: boolean): void;
  [MutationType.SetIdentityGridList](state: State, list: IdentityEl[]): void;
  [MutationType.SetNetwork](state: State, item: Network): void;
  [MutationType.SetToken](state: State, token: string): void;
  [MutationType.SetNetworkProvider](state: State, prodiver: string): void;
  [MutationType.SetNetworkConnected](state: State, connected: boolean): void;
  [MutationType.SetNetworkMinAmount](state: State, minAmount: number): void;
  [MutationType.SetNetworkAPI](state: State, api: ApiPromise): void;
  [MutationType.SetNotification](state: State, item: Notification): void;
  [MutationType.SetPaginationPage](state: State, page: number): void;
  [MutationType.SetPaginationSize](state: State, sizePerPage: number): void;
  [MutationType.SetPaginationState](state: State, overview: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetWallet](state, wallet) {
    state.wallet = wallet;
  },
  [MutationType.SetMyIdentity](state, identity) {
    state.myIdentity = identity;
  },
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
  [MutationType.SetToken](state, token) {
    if (state.network) {
      state.network.token = token;
    }
  },
  [MutationType.SetNetworkProvider](state, provider) {
    if (state.network) {
      state.network.wsProvider = provider;
    }
  },
  [MutationType.SetNetworkConnected](state, connected) {
    if (state.network) {
      state.network.connected = connected;
      state.network.url = `${
        Constants.explorerDomain
      }/${state.network.title.toLowerCase()}/account?filter[has_identity]=1`;
    }
  },
  [MutationType.SetNetworkAPI](state, api) {
    if (state.network) {
      state.network.api = api;
    }
  },
  [MutationType.SetNetworkMinAmount](state, minAmount) {
    if (state.network) {
      state.network.minAmount = minAmount;
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
