import { expect } from "chai";

type Action = (ctx?: any, payload?: any) => any;

type expectedInvokers = {
  type: string;
  payload?: any;
  options?: {
    checkPayload: boolean;
  };
};

export const testAction = (
  action: Action,
  actionPayload: any,
  state: null | Record<string, unknown>,
  expectedMutations: expectedInvokers[],
  expectedActions: expectedInvokers[],
  done: (err?: any) => void
): void => {
  let countMutations = 0;
  let countActions = 0;
  const commit = (type: string, payload: any) => {
    const mutation = expectedMutations[countMutations];
    try {
      expect(mutation.type).to.equal(type);
      const checkPayload = mutation.options
        ? mutation.options.checkPayload
        : true;
      if (payload && checkPayload) {
        expect(mutation.payload).to.deep.equal(payload);
      }
      countMutations++;
      if (
        countMutations >= expectedMutations.length &&
        countActions >= expectedActions.length
      ) {
        done();
      }
    } catch (err) {
      done(err);
    }
  };
  const dispatch = (type: string, payload: any) => {
    const dispachingAction = expectedActions[countActions];
    try {
      expect(dispachingAction.type).to.equal(type);
      const checkPayload = dispachingAction.options
        ? dispachingAction.options.checkPayload
        : true;
      if (payload && checkPayload) {
        expect(dispachingAction.payload).to.deep.equal(payload);
      }
      countActions++;
      if (
        countMutations >= expectedMutations.length &&
        countActions >= expectedActions.length
      ) {
        done();
      }
    } catch (err) {
      if (done) {
        done(err);
      }
    }
  };
  if (expectedMutations.length === 0 && expectedActions.length === 0) {
    expect(countMutations).to.equal(0);
    expect(countMutations).to.equal(0);
    if (done) {
      done();
    }
  } else {
    action({ commit, state, dispatch }, actionPayload);
  }
};
