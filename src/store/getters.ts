import { GetterTree } from "vuex";

import { DeriveAccountRegistration } from "@polkadot/api-derive/types";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import {
  State,
  Identity,
  IdentityEl,
  Network,
  Notification,
  Pagination
} from "./state";

export type Getters = {
  polkadotNetwork(state: State): Network | undefined;
  wallet(state: State): InjectedAccountWithMeta | null;
  myIdentity(state: State): Identity | DeriveAccountRegistration | null;
  identity(state: State): Identity | DeriveAccountRegistration | null;
  identityLoading(state: State): boolean;
  identityList(state: State): IdentityEl[];
  identityListLoading(state: State): boolean;
  identityGridList(state: State): IdentityEl[];
  network(state: State): Network | null;
  token(state: State): string | null;
  networkList(state: State): Network[];
  notification(state: State): Notification;
  pagination(state: State): Pagination;
};

export const getters: GetterTree<State, State> & Getters = {
  wallet(state) {
    return state.wallet;
  },
  polkadotNetwork(state) {
    return state.networkList.find((el) => el.title === "Polkadot");
  },
  myIdentity(state) {
    return state.myIdentity;
  },
  identity(state) {
    return state.identity;
  },
  judgement({ identity }) {
    if (identity && identity.judgements && identity.judgements.length) {
      const verification =
        identity.judgements[0][identity.judgements[0].length - 1].toString();
      if (verification) {
        identity.judgements = verification;
      }
      return verification;
    }
    return null;
  },
  identityLoading(state) {
    return state.identityLoading;
  },
  identityList(state) {
    return state.identityList;
  },
  identityListLoading(state) {
    return state.identityListLoading;
  },
  identityGridList(state) {
    return state.identityGridList;
  },
  network(state) {
    return state.network;
  },
  token(state) {
    if (state.network) {
      return state.network.token;
    }
    return null;
  },
  networkList(state) {
    return state.networkList;
  },
  notification(state) {
    return state.notification;
  },
  pagination(state) {
    return state.pagination;
  }
};
