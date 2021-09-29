import { ActionTypes } from "@/store/actions";

import { testAction } from "./testUtils";

import { actions } from "@/store/actions";
import { MutationType } from "@/store/mutations";
import {
  wallet,
  network,
  notification,
  pagination,
  allIdentities
} from "./mockData";

describe("Actions", () => {
  it("should set a wallet", (done) => {
    const payload = wallet;
    const state = {};
    const expectedMutations = [{ type: MutationType.SetWallet, payload }];
    testAction(
      actions[ActionTypes.SetWallet],
      payload,
      state,
      expectedMutations,
      [],
      done
    );
  });
  it("should set a network", (done) => {
    const payload = network;
    const state = {};
    const expectedMutations = [{ type: MutationType.SetNetwork, payload }];
    testAction(
      actions[ActionTypes.SetNetwork],
      payload,
      state,
      expectedMutations,
      [],
      done
    );
  });
  it("should set a network provider", (done) => {
    const payload = network.wsProvider;
    const state = {};
    const expectedMutations = [
      { type: MutationType.SetNetworkProvider, payload }
    ];
    testAction(
      actions[ActionTypes.SetNetworkProvider],
      payload,
      state,
      expectedMutations,
      [],
      done
    );
  });
  it("should connect to a network", (done) => {
    const expectedMutations = [
      {
        type: MutationType.SetIdentityListLoading,
        payload: true
      },
      {
        type: MutationType.SetAllIdentities,
        options: {
          checkPayload: false
        }
      },
      {
        type: MutationType.SetNetworkConnected,
        payload: { isConnected: true, chain: "" }
      },
      {
        type: MutationType.SetNetworkAPI,
        options: {
          checkPayload: false
        }
      },
      {
        type: MutationType.SetNetworkDisplayName,
        payload: "Polkadot"
      },
      {
        type: MutationType.SetToken,
        payload: "DOT"
      },
      {
        type: MutationType.SetNetworkMinAmount,
        payload: "0.0000000001"
      },
      {
        type: MutationType.SetNetworkDecimals,
        payload: 10
      },
      {
        type: MutationType.SetIdentityListLoading,
        payload: false
      }
    ];
    const expectedActions = [
      {
        type: ActionTypes.SetNotification,
        options: {
          checkPayload: false
        }
      },
      {
        type: ActionTypes.SetPaginationPage,
        payload: 1
      }
    ];
    testAction(
      actions[ActionTypes.ConnectToNetwork],
      null,
      { network },
      expectedMutations,
      expectedActions,
      done
    );
  }).timeout(5000);
  it("should set notification", (done) => {
    const expectedMutations = [
      {
        type: MutationType.SetNotification,
        payload: notification
      }
    ];
    testAction(
      actions[ActionTypes.SetNotification],
      null,
      {},
      expectedMutations,
      [],
      done
    );
  });
  it("should set pagination page", (done) => {
    const expectedMutations = [
      {
        type: MutationType.SetIdentityListLoading,
        payload: true
      },
      {
        type: MutationType.SetPaginationPage,
        payload: 1
      },
      {
        type: MutationType.SetPaginationState,
        options: {
          checkPayload: false
        }
      }
    ];
    const expectedActions = [
      {
        type: ActionTypes.GetIdentityList,
        options: {
          checkPayload: false
        }
      }
    ];
    testAction(
      actions[ActionTypes.SetPaginationPage],
      1,
      { pagination, allIdentities },
      expectedMutations,
      expectedActions,
      done
    );
  });
  it("should set pagination size", (done) => {
    const expectedMutations = [
      {
        type: MutationType.SetPaginationSize,
        payload: 10
      },
      {
        type: MutationType.SetPaginationState,
        options: {
          checkPayload: false
        }
      }
    ];
    const expectedActions = [
      {
        type: ActionTypes.GetIdentityList,
        options: {
          checkPayload: false
        }
      }
    ];
    testAction(
      actions[ActionTypes.SetPaginationSize],
      10,
      { pagination, allIdentities },
      expectedMutations,
      expectedActions,
      done
    );
  });
});
