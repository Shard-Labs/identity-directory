import BigNumber from "bignumber.js";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { u8aToString } from "@polkadot/util";
import { web3FromSource } from "@polkadot/extension-dapp";

import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { Network, Notification, State } from "./state";

function calcPaginationState(
  page: number,
  sizePerPage: number,
  total: number
): string {
  const topRange = total < page * sizePerPage ? total : page * sizePerPage;
  return `${(page - 1) * sizePerPage + 1}-${topRange || 10}`;
}

async function getAddressFromIndex(
  api: ApiPromise,
  index: string
): Promise<any> {
  try {
    const accountData = await api.query.indices.accounts(index);
    const account = accountData.toHuman();
    if (Array.isArray(account)) {
      return account[0];
    }
  } catch (error) {
    return "";
  }
}

async function getAddressFromFields(
  api: ApiPromise,
  field: string
): Promise<any> {
  const allIdentities = await getAllIdentities(api);
  const query = new RegExp(`${field}`, "i");
  let identities = allIdentities;
  if (field) {
    identities = allIdentities
      .filter((user: any) => {
        const {
          display,
          riot,
          twitter,
          web,
          legal,
          email
          // @ts-ignore
        } = user;
        switch (true) {
          case query.test(display):
            return true;
          case query.test(email):
            return true;
          case query.test(legal):
            return true;
          case query.test(riot):
            return true;
          case query.test(twitter):
            return true;
          case query.test(web):
            return true;
          default:
            return false;
        }
      })
      .sort((a: any, b: any) => {
        const nameA =
          (a.legal && a.legal.toLowerCase()) ||
          (a.display && a.display.toLowerCase()) ||
          a.address;
        const nameB =
          (b.legal && b.legal.toLowerCase()) ||
          (b.display && b.display.toLowerCase()) ||
          b.address;
        switch (true) {
          case query.test(nameA) && query.test(nameB) && nameA > nameB:
            return 1;
          case query.test(nameA) && query.test(nameB) && nameB > nameA:
            return -1;
          case query.test(nameA) && !query.test(nameB):
            return -1;
          case !query.test(nameA) && query.test(nameB):
            return 1;
          case nameA > nameB:
            return 1;
          case nameB > nameA:
            return -1;
          default:
            return 0;
        }
      });
  }
  if (identities.length === 1) {
    return identities[0].address;
  } else if (identities.length > 1) {
    return identities;
  }
  return "";
}

async function getAllIdentities(api: ApiPromise) {
  const list = await api.query.identity.identityOf.entries();
  let members: string[] = [];
  try {
    members = (await api.query.council.members()).map((el: any) => el.toHuman());
  } catch (ex) {
    members = [];
  }
  return list.map((identity: any) => {
    const {
      display: { Raw: display },
      email: { Raw: email },
      legal: { Raw: legal },
      riot: { Raw: riot },
      twitter: { Raw: twitter },
      web: { Raw: web }
      // @ts-ignore
    } = identity[1].toHuman().info;
    const addressArray = identity[0].toHuman();
    let address = "";
    if (Array.isArray(addressArray)) {
      address = `${addressArray[0]}`;
    }
    let parsedDisplay = "";
    if (display && /^0x/.test(display)) {
      // @ts-ignore
      const {
        info: { display }
      } = identity[1].unwrap();
      parsedDisplay = u8aToString(display.asRaw.toU8a(true));
    }
    return {
      display: parsedDisplay || display,
      address,
      is_council_member: members.includes(address),
      riot,
      twitter,
      web,
      legal,
      email
    };
  });
}

export enum ActionTypes {
  SetWallet = "SET_WALLET",
  GetIdentity = "GET_IDENTITY",
  SearchIdentity = "SEARCH_IDENTITY",
  GetIdentityList = "GET_IDENTITY_LIST",
  SetIdentityList = "SET_IDENTITY_LIST",
  SetNetwork = "SET_NETWORK",
  SetNetworkProvider = "SET_NETWORK_PROVIDER",
  ConnectToNetwork = "CONNECT_TO_NETWORK",
  SetNotification = "SET_NOTIFICATION",
  SetPaginationPage = "SET_PAGINATION_PAGE",
  SetPaginationSize = "SET_PAGINATION_SIZE",
  SendTokens = "SEND_TOKENS",
  SetIdentityListLoading = "SET_IDENTITY_LIST_LOADING"
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.SetWallet](
    context: ActionAugments,
    wallet: InjectedAccountWithMeta | null
  ): void;
  [ActionTypes.GetIdentity](context: ActionAugments, address: string): void;
  [ActionTypes.SearchIdentity](
    context: ActionAugments,
    query: string
  ): Promise<boolean>;
  [ActionTypes.GetIdentityList](context: ActionAugments): void;
  [ActionTypes.SetIdentityListLoading](
    context: ActionAugments,
    show: boolean
  ): void;
  [ActionTypes.SetNetwork](context: ActionAugments, network: Network): void;
  [ActionTypes.SetNetworkProvider](
    context: ActionAugments,
    provider: string
  ): void;
  [ActionTypes.ConnectToNetwork](context: ActionAugments): Promise<boolean>;
  [ActionTypes.SetNotification](
    context: ActionAugments,
    notification: Notification
  ): void;
  [ActionTypes.SetPaginationPage](context: ActionAugments, page: number): void;
  [ActionTypes.SetPaginationSize](context: ActionAugments, page: number): void;
  [ActionTypes.SendTokens](
    context: ActionAugments,
    payload: { amount: number; address: string }
  ): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.SetWallet]({ state, commit }, wallet) {
    commit(MutationType.SetWallet, wallet);
    if (wallet) {
      const { address } = wallet;
      if (state.network) {
        const { api } = state.network;
        let identity: any;
        if (api) {
          identity = await api.derive.accounts.identity(address);
        }
        const judgements: any[] = [];
        if (identity) {
          identity.judgements.forEach((el: any) => {
            judgements.push(...Object.keys(el[1].toHuman()));
            identity.judgements = judgements;
          });
          commit(MutationType.SetMyIdentity, identity);
        }
      }
    } else {
      commit(MutationType.SetMyIdentity, null);
    }
  },
  async [ActionTypes.GetIdentity]({ commit, state }, address) {
    if (state.network) {
      // Clearing the state
      commit(MutationType.SetIdentity, null);
      commit(MutationType.SetIdentityLoading, true);
      const { api } = state.network;
      let identity: any, balances: any, decimals: any;
      // fetching the identity data if there is connection to the chain
      if (api) {
        identity = await api.derive.accounts.identity(address);
        balances = await api.derive.balances.account(address);
        decimals = api.registry.chainDecimals;
        decimals = new BigNumber(decimals).toNumber();
      }
      // Calculating all the balances for the account
      if (balances) {
        const { freeBalance, reservedBalance, frozenMisc } = balances;
        const base = new BigNumber(10).pow(decimals);
        identity.balance = new BigNumber(freeBalance.toHex())
          .plus(reservedBalance.toHex())
          .div(base)
          .toFixed(2);
        identity.freeBalance = new BigNumber(freeBalance.toHex())
          .div(base)
          .toFixed(2);
        identity.availableBalance = new BigNumber(freeBalance.toHex())
          .minus(frozenMisc.toHex())
          .multipliedBy(state.network.minAmount)
          .toFixed(2);
        identity.reservedBalance = new BigNumber(reservedBalance.toHex())
          .div(base)
          .toFixed(2);
        identity.lockedBalance = new BigNumber(frozenMisc.toHex())
          .div(base)
          .toFixed(2);
      }
      // Cleaning up the judgments array
      const judgements: any[] = [];
      if (identity) {
        identity.judgements.forEach((el: any) => {
          judgements.push(...Object.keys(el[1].toHuman()));
          identity.judgements = judgements;
        });
        commit(MutationType.SetIdentity, identity);
      }
      commit(MutationType.SetIdentityLoading, false);
    }
  },
  async [ActionTypes.SearchIdentity]({ state, commit, dispatch }, query) {
    if (state.network) {
      commit(MutationType.SetIdentityListLoading, true);
      const { api } = state.network;
      let identity: any;
      let accountId: any;
      if (!query && api) {
        const allIdentities = await getAllIdentities(api);
        commit(MutationType.SetAllIdentities, allIdentities);
        commit(MutationType.SetIsSearchResults, false);
        dispatch(ActionTypes.SetPaginationPage, 1);
        commit(MutationType.SetIdentityListLoading, false);
        return allIdentities;
      }
      query = query.trim();
      if (api) {
        // Getting the address from the input if it's a index
        const [fromIndex, fromFields] = await Promise.all([
          getAddressFromIndex(api, query),
          getAddressFromFields(api, query)
        ]);
        if (Array.isArray(fromFields)) {
          commit(MutationType.SetAllIdentities, fromFields);
          commit(MutationType.SetIsSearchResults, true);
          dispatch(ActionTypes.SetPaginationPage, 1);
          commit(MutationType.SetIdentityListLoading, false);
          return fromFields;
        }
        accountId = fromIndex || fromFields;
        try {
          if (accountId) {
            identity = await api.derive.accounts.identity(accountId);
          } else {
            identity = await api.derive.accounts.identity(query);
          }
        } catch (ex) {
          commit(MutationType.SetIdentityListLoading, false);
          return false;
        }
        commit(MutationType.SetIdentityListLoading, false);
      }
      if (!identity) {
        return "";
      }
      return accountId || query;
    }
    return "";
  },
  async [ActionTypes.GetIdentityList]({ commit, state, dispatch }) {
    const { network, allIdentities = [], searchResults } = state;
    let api;
    if (network) {
      api = network.api;
    }
    if (network && api) {
      // Clearing the list
      commit(MutationType.SetIdentityListLoading, true);
      commit(MutationType.SetIdentityList, []);
      commit(MutationType.SetIdentityGridList, []);
      const { url } = network;
      try {
        if (!url) {
          return;
        }
        let list = [];
        // Fetching the data from the node
        if (!allIdentities.length) {
          list = await getAllIdentities(api);
          commit(MutationType.SetAllIdentities, list);
        } else {
          list = allIdentities;
        }
        // Cleaning up the list and separating the first 3 for the grid
        dispatch(ActionTypes.SetIdentityList, { list, searchResults });
      } catch (ex) {
        console.error(ex);
      }
    }
  },
  async [ActionTypes.SetIdentityList](
    { commit, state },
    { list, searchResults = false }
  ) {
    const {
      pagination: { page, sizePerPage }
    } = state;
    let identityList = [];
    let identityListGrid = [];
    if (searchResults) {
      identityList = list;
      identityList = list.slice((page - 1) * sizePerPage, page * sizePerPage);
    } else if (page !== 1) {
      identityList = list.slice(
        (page - 1) * sizePerPage + 3,
        page * sizePerPage + 3
      );
    } else {
      identityList = list.slice(
        (page - 1) * (sizePerPage + 3),
        page * (sizePerPage + 3)
      );
      identityListGrid = identityList.slice(0, 3);
      identityList.splice(0, 3);
    }
    commit(MutationType.SetIdentityGridList, identityListGrid);
    commit(MutationType.SetIdentityList, identityList);
  },
  async [ActionTypes.SetNetwork]({ commit }, network) {
    commit(MutationType.SetNetwork, network);
  },
  async [ActionTypes.SetIdentityListLoading]({ commit }, show) {
    commit(MutationType.SetIdentityListLoading, show);
  },
  async [ActionTypes.SetNetworkProvider]({ commit }, provider) {
    commit(MutationType.SetNetworkProvider, provider);
  },
  async [ActionTypes.ConnectToNetwork]({ commit, state, dispatch }) {
    commit(MutationType.SetIdentityListLoading, true);
    // Resetting the list pagination page
    const { network } = state;
    try {
      if (network) {
        // Connecting to the network
        const provider = new WsProvider(network.wsProvider);
        const api = await ApiPromise.create({ provider, throwOnConnect: true });
        const { isConnected } = api;
        if (isConnected) {
          let chain = "";
          // Check the chain of the custom node
          if (network.custom) {
            chain = (await api.rpc.system.chain()).toHuman().toLowerCase();
            if (!chain) {
              // Notify user if can't extract the chain info from the custom node
              commit(MutationType.SetIdentityListLoading, false);
              dispatch(ActionTypes.SetNotification, {
                show: true,
                message:
                  "Can't display Identities List on selected Custom Node",
                type: "warning"
              });
              return true;
            }
          }
          const allIdentities = await getAllIdentities(api);
          commit(MutationType.SetAllIdentities, allIdentities);
          // Extracting the prefix for the address transform
          network.prefix = api.consts.system.ss58Prefix.toNumber();
          const genesisHash = (await api.rpc.chain.getBlockHash(0)).toHuman();
          if (genesisHash) {
            network.genesisHash = genesisHash.toString();
          }
          commit(MutationType.SetNetworkConnected, { isConnected, chain });
          commit(MutationType.SetNetworkAPI, api);
          // Extracting the token info from the chain
          const properties = (await api.rpc.system.properties()).toHuman();
          if (!network.displayName) {
            const { specName } = api.consts.system.version.toHuman();
            const displayName = `${specName}`.toLocaleLowerCase();
            commit(
              MutationType.SetNetworkDisplayName,
              displayName.charAt(0).toUpperCase() + displayName.slice(1)
            );
          }
          const { tokenSymbol } = properties;
          if (
            tokenSymbol &&
            Array.isArray(tokenSymbol) &&
            tokenSymbol.length > 0
          ) {
            commit(MutationType.SetToken, tokenSymbol.shift() as string);
            let decimals: any;
            decimals = api.registry.chainDecimals;
            decimals = new BigNumber(decimals).toNumber();
            const minAmount = new BigNumber(1).div(
              new BigNumber(10).pow(decimals).toString()
            );
            commit(
              MutationType.SetNetworkMinAmount,
              minAmount.toFixed(decimals)
            );
            commit(MutationType.SetNetworkDecimals, decimals);
          }
          dispatch(ActionTypes.SetPaginationPage, 1);
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Connected to Network/Node",
            type: "success"
          });
          dispatch(ActionTypes.SetWallet, null);
          commit(MutationType.SetIdentityListLoading, false);
        } else {
          commit(MutationType.SetIdentityListLoading, false);
          dispatch(ActionTypes.SetNotification, {
            show: true,
            message: "Unable To connect to Network/Node",
            type: "danger"
          });
        }
      } else {
        commit(MutationType.SetIdentityListLoading, false);
        dispatch(ActionTypes.SetNotification, {
          show: true,
          message: "Network Not Selected",
          type: "error"
        });
      }
    } catch (ex) {
      commit(MutationType.SetIdentityListLoading, false);
      dispatch(ActionTypes.SetNotification, {
        show: true,
        message: "Unable To connect to Network/Node",
        type: "error"
      });
    }
    return true;
  },
  async [ActionTypes.SetNotification]({ commit }, notification) {
    commit(MutationType.SetNotification, notification);
  },
  async [ActionTypes.SetPaginationPage]({ commit, state, dispatch }, page) {
    if (page < 1) {
      return;
    }
    const { sizePerPage } = state.pagination;
    const { allIdentities } = state;
    if (allIdentities.length < (page - 1) * sizePerPage) {
      commit(MutationType.SetIdentityListLoading, false);
      return dispatch(ActionTypes.SetNotification, {
        type: "warning",
        show: true,
        message: `No more results`
      });
    }
    commit(MutationType.SetIdentityListLoading, true);
    const overview = calcPaginationState(
      page,
      sizePerPage,
      allIdentities.length
    );
    commit(MutationType.SetPaginationPage, page);
    commit(MutationType.SetPaginationState, overview);
    dispatch(ActionTypes.GetIdentityList);
    commit(MutationType.SetIdentityListLoading, false);
  },
  async [ActionTypes.SetPaginationSize](
    { commit, state, dispatch },
    sizePerPage
  ) {
    const {
      pagination: { page },
      allIdentities
    } = state;
    const overview = calcPaginationState(
      page,
      sizePerPage,
      allIdentities.length
    );
    commit(MutationType.SetPaginationSize, sizePerPage);
    commit(MutationType.SetPaginationState, overview);
    dispatch(ActionTypes.GetIdentityList);
    commit(MutationType.SetIdentityListLoading, false);
  },
  async [ActionTypes.SendTokens]({ state, dispatch }, { address, amount }) {
    const { network, wallet } = state;
    if (network && network.api) {
      if (wallet) {
        // Preparing planck amount to transfer
        const planckAmount = new BigNumber(amount).multipliedBy(
          new BigNumber(10).pow(network.decimals)
        );
        // Creating transfer
        const transfer = network.api.tx.balances.transfer(
          address,
          planckAmount.toNumber()
        );
        // signing the transfer
        const injector = await web3FromSource(wallet.meta.source);
        transfer
          .signAndSend(
            wallet.address,
            { signer: injector.signer },
            ({ status }) => {
              if (status.isInBlock) {
                dispatch(ActionTypes.SetNotification, {
                  type: "success",
                  show: true,
                  message: `Completed at block hash #${status.asInBlock.toString()}`
                });
              } else {
                dispatch(ActionTypes.SetNotification, {
                  type: "warning",
                  show: true,
                  message: `Current status: ${status.type}`
                });
              }
            }
          )
          .catch(() => {
            dispatch(ActionTypes.SetNotification, {
              type: "error",
              show: true,
              message: "Transaction Failed"
            });
          });
      } else {
        dispatch(ActionTypes.SetNotification, {
          type: "error",
          show: true,
          message: "Account Not Connected!"
        });
      }
    } else {
      dispatch(ActionTypes.SetNotification, {
        type: "error",
        show: true,
        message: "Not Connected the Network"
      });
    }
  }
};
