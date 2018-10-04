import { ApolloClient } from "apollo-client";
import { from, ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { setContext } from "apollo-link-context";
import { withClientState, ClientStateConfig } from "apollo-link-state";
import { HttpOptions } from "apollo-link-http-common";
import { ApolloCache } from "apollo-cache";

interface ICreateApolloClientArgs {
  httpEndpoint: string;
  httpLinkOptions?: HttpOptions;
  wsEndpoint?: string;
  uploadEndpoint?: string;
  tokenName: string;
  persisting: boolean;
  ssr: boolean;
  websocketsOnly: boolean;
  link?: ApolloLink;
  cache?: ApolloCache<NormalizedCacheObject>;
  apollo?: any;
  clientState?: ClientStateConfig;
  stateLink?: any;
}

// Create the apollo client
export function createApolloClient(args: ICreateApolloClientArgs) {
  // tslint:disable-next-line:one-variable-per-declaration
  let authLink;
  let { link, cache, stateLink } = args;
  const {
    websocketsOnly,
    ssr,
    wsEndpoint,
    apollo,
    persisting,
    tokenName,
    clientState,
    httpEndpoint,
    httpLinkOptions
  } = args;
  const disableHttp = websocketsOnly && !ssr && wsEndpoint;

  // Apollo cache
  if (!cache) {
    cache = new InMemoryCache();
  }

  if (!disableHttp) {
    const httpLink = createUploadLink({
      uri: httpEndpoint,
      ...httpLinkOptions
    });

    link = link ? from([link, httpLink]) : httpLink;

    authLink = setContext((_, { headers }) => {
      const authorization = defaultGetAuth(tokenName);
      const authorizationHeader = authorization ? { authorization } : {};
      return {
        headers: {
          ...headers,
          ...authorizationHeader
        }
      };
    });

    // Concat all the http link parts
    link = authLink.concat(link);
  }

  // On the server, we don't want WebSockets and Upload links
  if (!ssr) {
    // If on the client, recover the injected state
    if (typeof window !== "undefined") {
      const state = (window as any).__APOLLO_STATE__;
      if (state) {
        cache.restore(state.defaultClient);
      }
    }

    if (!disableHttp) {
      if (persisting) {
        link = createPersistedQueryLink().concat(link as ApolloLink);
      }
    }
  }

  if (clientState) {
    stateLink = withClientState({
      cache,
      ...clientState
    });
    link = from([stateLink, link]);
  }

  const apolloClient = new ApolloClient({
    link,
    cache,
    // Additional options
    ...(ssr
      ? {
          // Set this on the server to optimize queries when SSR
          ssrMode: true
        }
      : {
          // This will temporary disable query force-fetching
          ssrForceFetchDelay: 100,
          // Apollo devtools
          connectToDevTools: process.env.NODE_ENV !== "production"
        }),
    ...apollo
  });

  // Re-write the client state defaults on cache reset
  if (stateLink) {
    // tslint:disable-next-line:only-arrow-functions
    apolloClient.onResetStore(function() {
      return Promise.resolve(stateLink.writeDefaults);
    });
  }

  return {
    apolloClient,
    stateLink
  };
}

function defaultGetAuth(tokenName: string) {
  // get the authentication token from local storage if it exists
  const token = window.localStorage.getItem(tokenName);
  // return the headers to the context so httpLink can read them
  return token ? `Bearer ${token}` : "";
}
