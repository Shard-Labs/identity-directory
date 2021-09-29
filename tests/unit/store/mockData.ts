import { ApiPromise, WsProvider } from "@polkadot/api";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import {
  Identity,
  IdentityEl,
  Network,
  Notification,
  Pagination
} from "@/store/state";

export const wallet: InjectedAccountWithMeta = {
  address: "test-address",
  meta: {
    genesisHash: "test-genesisHash",
    name: "test-name",
    source: "test-source"
  }
};

export const identity: Identity = {
  id: "test-id",
  email: "test-email",
  name: "test-name",
  web: "test-web",
  twitter: "test-twitter",
  riot: "test-riot",
  address: "test-address",
  balance: "test-balance"
};

export const identityEl: IdentityEl = {
  display: "Test Display Name",
  address: "test address",
  is_council_member: false,
  riot: "test",
  twitter: "test",
  web: "test",
  legal: "test",
  email: "test"
};

export const identityList: IdentityEl[] = [{ ...identityEl }];

export const network: Network = {
  title: "Polkadot",
  wsProvider: "wss://rpc.polkadot.io",
  connected: false,
  url: "https://explorer-32.polkascan.io/api/v1/polkadot/account?filter[has_identity]=1",
  api: null,
  custom: false,
  token: "",
  minAmount: "0.0000000001",
  decimals: 10
};

export const notification: Notification = {
  message: "test-message",
  show: true,
  type: "test-type"
};

export const pagination: Pagination = {
  page: 0,
  sizePerPage: 0,
  state: "test-state"
};

export const allIdentities: Identity[] = [
  {
    id: "test-id",
    email: "test-email",
    name: "test-name",
    web: "test-web",
    twitter: "test-twitter",
    riot: "test-riot",
    address: "test-address",
    balance: "test-balance"
  }
]

const wsProvider = new WsProvider(network.wsProvider);
export const api = new ApiPromise({ provider: wsProvider });
