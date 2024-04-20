import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

import responseCachePlugin from 'apollo-server-plugin-response-cache'

import Keyv from 'keyv'
import { KeyvAdapter } from '@apollo/utils.keyvadapter'
import KeyvRedis from '@keyv/redis'

// import apolloCachePlugin from './apolloCachePlugin.js'

export function createApolloServer({ httpServer, schema, getContext = () => {}, getSubscriptionContext = () => {}, environment = 'development' }) {
  const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        return getSubscriptionContext(ctx, msg, args)
      }
    },
    wsServer
  ) // Save the returned server's info so we can shutdown this server later

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: process.env.NODE_ENV !== 'production',
    // cache: new KeyvAdapter(new Keyv(options), { disableBatchReads: true }),
    cache: new KeyvAdapter(new Keyv({ store: new KeyvRedis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, password: process.env.REDIS_USE_PASSWORD === 'true' ? process.env.REDIS_PASSWORD : null }) }), { disableBatchReads: true }),

    // cacheControl: true,
    // corsOptions: {origin: '*'},

    formatError: (error) => {
      if (environment === 'production') {
        const message = error?.message ? error.message.replace('SequelizeValidationError: ', '').replace('Validation error: ', '') : 'Internal server error'
        return new Error(message)
      }
      return error
    },
    context: async ({ req }) => {
      let ip
      let userAgent = ''
      // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      // 'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"'
      // 'sec-ch-ua-mobile': '?0'
      // 'sec-ch-ua-platform': '"macOS"'
      // 'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
      try { ip = req.headers['x-forwarded-for'] } catch (err) { console.error(err) }
      try { userAgent = `${req?.headers['user-agent'] || ''}|${req?.headers['sec-ch-ua'] || ''}|${req?.headers['sec-ch-ua-mobile'] || ''}|${req?.headers['sec-ch-ua-platform'] || ''}|${req.headers['accept-language'] || ''}` } catch (err) { console.error(err) }
      const host = req?.headers?.host || ''
      if (req && req?.headers?.authorization) {
        const authorization = req?.headers?.authorization || ''
        const token = authorization.replace('Bearer ', '')
        return await getContext(token, ip, host, userAgent)
      } else if (req) {
        return await getContext(null, ip, host, userAgent)
      }
    },
    plugins: [
      ApolloServerPluginLandingPageDisabled(),
      // apolloCachePlugin(),
      responseCachePlugin.default(),
      ApolloServerPluginDrainHttpServer({ httpServer }), // Proper shutdown for the HTTP server.
      { // Proper shutdown for the WebSocket server.
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  return server
}
