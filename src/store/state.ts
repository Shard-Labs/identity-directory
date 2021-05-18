import { ApiPromise } from "@polkadot/api";
import { DeriveAccountRegistration } from "@polkadot/api-derive/types";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

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
  minAmount: number;
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
  wallet: InjectedAccountWithMeta | null;
  myIdentity: DeriveAccountRegistration | Identity | null;
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
  wallet: null,
  myIdentity: null,
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
      token: "",
      minAmount: 0.0000000001
    },
    {
      title: "Kusama",
      wsProvider: "wss://kusama-rpc.polkadot.io",
      connected: false,
      url: "",
      api: null,
      custom: false,
      token: "",
      minAmount: 0.000000000001
    },
    {
      title: "Custom Node",
      wsProvider: "",
      connected: false,
      url: "",
      api: null,
      custom: true,
      token: "",
      minAmount: 0.000000000001
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
