import { ApiPromise } from "@polkadot/api";
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
  id: "test-id",
  type: "test-type",
  attribute: {}
};

export const identityList: IdentityEl[] = [{ ...identityEl }];

export const network: Network = {
  title: "Polkadot",
  wsProvider: "wss://rpc.polkadot.io",
  connected: false,
  url:
    "https://explorer-32.polkascan.io/api/v1/polkadot/account?filter[has_identity]=1",
  api: null,
  custom: false,
  token: "",
  minAmount: 0.0000000001
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

export const api = new ApiPromise();
