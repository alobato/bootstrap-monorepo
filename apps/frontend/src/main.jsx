import ReactDOM from 'react-dom/client'

import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import { split, HttpLink, ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'

import { ErrorBoundary } from 'react-error-boundary'

import App from './App'

import './i18n'

import './globals.css'

const LOGIN_PATH = '/login'
const STORAGE_KEY = 'token'

function logoutAndRedirectTo(redirectPath, storageKey) {
  localStorage.removeItem(storageKey)
  if (redirectPath) {
    window.location.href = redirectPath
  }
}

let baseAPI = import.meta.env.VITE_BASE_API

const wsBaseAPI = baseAPI.replace('http://', 'ws://').replace('https://', 'wss://')

const httpLink = new HttpLink({ uri: `${baseAPI}/graphql` })

let activeSocket
let timedOut
const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN)
const wsLink = new GraphQLWsLink(createClient({
  url: `${wsBaseAPI}/graphql`,
  keepAlive: 10_000, // ping server every 10 seconds
  connectionParams: {
    authentication: token
  },
  on: {
    connected: (socket) => {
      activeSocket = socket
    },
    ping: (received) => {
      if (!received) {
        timedOut = setTimeout(() => {
          if (activeSocket.readyState === WebSocket.OPEN)
            activeSocket.close(4408, 'Request Timeout')
        }, 5_000)
      }
    },
    pong: (received) => {
      if (received) {
        clearTimeout(timedOut)
      }
    }
  }
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
  },
  wsLink, httpLink
)

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const { message, locations, path } of graphQLErrors) {
      // eslint-disable-next-line no-console
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    }
    for (const { message } of graphQLErrors) {
      if (message === 'Context creation failed: Your session expired. Sign in again.' || message === 'Not authenticated as user.') {
        // eslint-disable-next-line no-console
        console.error(`[createApolloClient graphQLError1]: ${message}`)
        logoutAndRedirectTo(LOGIN_PATH, STORAGE_KEY)
      } else {
        // eslint-disable-next-line no-console
        console.error(`[createApolloClient graphQLError2]: ${message}`)
      }
    }
  }
  if (networkError) {
    // TODO
    const errorMessage = `[createApolloClient networkError]: ${networkError}`
    // eslint-disable-next-line no-console
    console.error(errorMessage) // TypeError: Failed to fetch
  }
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN)
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } }
})

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, splitLink]),
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<div>Something went wrong</div>} >
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ErrorBoundary>
)
