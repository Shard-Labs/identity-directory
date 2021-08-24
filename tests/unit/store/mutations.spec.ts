import { expect } from "chai";
import { state as initailState, State } from "@/store/state";
import { mutations, MutationType } from "@/store/mutations";
import * as mockData from "./mockData";

describe("mutations", () => {
  let state: State;
  beforeEach(() => {
    state = JSON.parse(JSON.stringify(initailState));
  });

  it("should set wallet in the state", () => {
    mutations[MutationType.SetWallet](state, mockData.wallet);
    expect(state.wallet).to.equal(mockData.wallet);
  });
  it("should set identity in the state", () => {
    mutations[MutationType.SetIdentity](state, mockData.identity);
    expect(state.identity).to.equal(mockData.identity);
  });
  it("should set user identity in the state", () => {
    mutations[MutationType.SetMyIdentity](state, mockData.identity);
    expect(state.myIdentity).to.equal(mockData.identity);
  });
  it("should set identity list in the state", () => {
    mutations[MutationType.SetIdentityList](state, mockData.identityList);
    expect(state.identityList).to.equal(mockData.identityList);
  });
  it("should set identity grid list in the state", () => {
    mutations[MutationType.SetIdentityGridList](state, mockData.identityList);
    expect(state.identityGridList).to.equal(mockData.identityList);
  });
  it("should set network grid list in the state", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    expect(state.network).to.equal(mockData.network);
  });
  it("should set token in the state", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    mutations[MutationType.SetToken](state, "test-token");
    expect(state.network).not.to.be.null;
    if (state.network) {
      expect(state.network.token).to.equal("test-token");
    }
  });
  it("should set networkProvider in the state", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    mutations[MutationType.SetNetworkProvider](
      state,
      mockData.network.wsProvider
    );
    expect(state.network).not.to.be.null;
    if (state.network) {
      expect(state.network.wsProvider).to.equal(mockData.network.wsProvider);
    }
  });
  it("should connect to a network", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    mutations[MutationType.SetNetworkConnected](state, true);
    expect(state.network).not.to.be.null;
    if (state.network) {
      expect(state.network.connected).to.equal(true);
      expect(state.network.url).to.equal(
        "https://explorer-32.polkascan.io/api/v1/polkadot/account?filter[has_identity]=1"
      );
    }
  });
  it("should set the API to the state", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    mutations[MutationType.SetNetworkAPI](state, mockData.api);
    expect(state.network).not.to.be.null;
    if (state.network) {
      expect(state.network.api).to.equal(mockData.api);
    }
  });
  it("should set network min amount to the state", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    mutations[MutationType.SetNetworkMinAmount](state, "10");
    expect(state.network).not.to.be.null;
    if (state.network) {
      expect(state.network.minAmount).to.equal("10");
    }
  });
  it("should set network decimals to the state", () => {
    mutations[MutationType.SetNetwork](state, mockData.network);
    mutations[MutationType.SetNetworkDecimals](state, 10);
    expect(state.network).not.to.be.null;
    if (state.network) {
      expect(state.network.decimals).to.equal(10);
    }
  });
  it("should set pagination to the state", () => {
    mutations[MutationType.SetNotification](state, mockData.notification);
    expect(state.notification).to.equal(mockData.notification);
  });
  it("should set pagination page to the state", () => {
    mutations[MutationType.SetPaginationPage](state, 0);
    expect(state.pagination.page).to.equal(0);
  });
  it("should set pagination page to the state", () => {
    mutations[MutationType.SetPaginationSize](state, 50);
    expect(state.pagination.sizePerPage).to.equal(50);
  });
  it("should set pagination state to the state", () => {
    mutations[MutationType.SetPaginationState](state, "1-100");
    expect(state.pagination.state).to.equal("1-100");
  });
});
