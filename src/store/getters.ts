import { GetterTree } from "vuex";
import { State, Identity, Network, Notification, Pagination } from "./state";

export type Getters = {
  identity(state: State): Identity | null;
  identityList(state: State): Identity[];
  network(state: State): Network | null;
  networkList(state: State): Network[];
  notification(state: State): Notification;
  pagination(state: State): Pagination;
};

export const getters: GetterTree<State, State> & Getters = {
  identity(state) {
    return state.identity;
  },
  identityList(state) {
    return state.identityList;
  },
  network(state) {
    return state.network;
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
