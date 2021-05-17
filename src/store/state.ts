import { ApiPromise } from "@polkadot/api";
import { DeriveAccountRegistration } from "@polkadot/api-derive/types";

export type IdentityEl = {
  id: string;
  type: string;
  attribute: object;
};

export type Identity = {
  id: string;
  email: string;
  name: string;
  web: string;
  twitter: string;
  riot: string;
  address: string;
  balance: string;
};

export type Network = {
  title: string;
  wsProvider: string;
  connected: boolean;
  url: string;
  api: ApiPromise | null;
  custom: boolean;
  token: string;
};

export type Notification = {
  message: string;
  show: boolean;
  type: string;
};

export type Pagination = {
  page: number;
  sizePerPage: number;
  state: string;
};
export type State = {
  identity: DeriveAccountRegistration | Identity | null;
  identityListLoading: boolean;
  identityList: IdentityEl[] | [];
  identityGridList: IdentityEl[] | [];
  network: Network | null;
  networkList: Network[] | [];
  notification: Notification;
  pagination: Pagination;
};

export const state: State = {
  identity: null,
  identityListLoading: false,
  identityList: [],
  identityGridList: [],
  network: null,
  networkList: [
    {
      title: "Polkadot",
      wsProvider: "wss://rpc.polkadot.io",
      connected: false,
      url: "",
      api: null,
      custom: false,
      token: ""
    },
    {
      title: "Kusama",
      wsProvider: "wss://kusama-rpc.polkadot.io",
      connected: false,
      url: "",
      api: null,
      custom: false,
      token: ""
    },
    {
      title: "Custom Node",
      wsProvider: "",
      connected: false,
      url: "",
      api: null,
      custom: true,
      token: ""
    }
  ],
  notification: {
    message: "",
    show: false,
    type: "success"
  },
  pagination: {
    page: 1,
    sizePerPage: 10,
    state: "1-10"
  }
};
