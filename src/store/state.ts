import { ApiPromise } from "@polkadot/api";
import { DeriveAccountRegistration } from "@polkadot/api-derive/types";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

export type IdentityEl = {
  address: string;
  display: string;
  riot: string;
  twitter: string;
  web: string;
  legal: string;
  email: string;
  is_council_member: boolean;
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
  judgements?: string;
};

export type Network = {
  title: string;
  wsProvider: string;
  connected: boolean;
  url: string;
  api: ApiPromise | null;
  custom: boolean;
  token: string;
  minAmount: string;
  decimals: number;
  prefix?: number;
  displayName?: string;
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
  identityLoading: boolean;
  identityListLoading: boolean;
  searchResults: boolean;
  identityList: IdentityEl[] | [];
  allIdentities: IdentityEl[] | [];
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
  identityLoading: false,
  identityListLoading: false,
  identityList: [],
  allIdentities: [],
  searchResults: false,
  identityGridList: [],
  network: null,
  networkList: [
    {
      title: "Polkadot",
      wsProvider: "wss://rpc.identityhub.xyz",
      connected: false,
      url: "",
      api: null,
      custom: false,
      token: "",
      minAmount: "0.0000000001",
      decimals: 10,
      displayName: "Polkadot"
    },
    {
      title: "Kusama",
      wsProvider: "wss://kusama-rpc.identityhub.xyz",
      connected: false,
      url: "",
      api: null,
      custom: false,
      token: "",
      minAmount: "0.000000000001",
      decimals: 12,
      displayName: "Kusama"
    },
    {
      title: "Custom",
      wsProvider: "",
      connected: false,
      url: "",
      api: null,
      custom: true,
      token: "",
      minAmount: "0.000000000001",
      decimals: 10,
      displayName: "",
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
