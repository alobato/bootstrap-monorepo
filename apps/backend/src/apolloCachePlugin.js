import { createHash } from 'node:crypto'

function isGraphQLQuery(requestContext) {
  return requestContext.operation?.operation === 'query'
}

function sha(s) {
  return createHash('sha256').update(s).digest('hex')
}

export default function cachePlugin(options) {
  return {
    async requestDidStart(outerRequestContext) {
      // console.log('outerRequestContext.cache', outerRequestContext.cache)

      // const generateCacheKey = options.generateCacheKey ?? ((_, key) => sha(JSON.stringify(key)))

      // const cache = new PrefixingKeyValueCache(
      //   options.cache || outerRequestContext.cache!,
      //   'fqc:',
      // )

      return {
        async responseForOperation(requestContext) {

          return null

          // const cacheKeyData = {
            // ...baseCacheKey!,
            // ...contextualCacheKeyFields,
          // };

          // const key = generateCacheKey(requestContext, cacheKeyData)



          // const cacheKeyData = {
          //   ...baseCacheKey!,
          //   ...contextualCacheKeyFields,
          // };

          // return cacheGet({ sessionMode: SessionMode.NoSession });

          // const generateCacheKey = options.generateCacheKey ?? ((_, key) => sha(JSON.stringify(key)))
          const generateCacheKey = ((_, key) => sha(JSON.stringify(key)))

          // const key = generateCacheKey(requestContext, cacheKeyData)
          const key = generateCacheKey('', requestContext)

          if (!isGraphQLQuery(requestContext)) {
            return null
          }


          // requestContext.overallCachePolicy.replace(value.cachePolicy);
          // requestContext.metrics.responseCacheHit = true;

          console.log('requestContext.overallCachePolicy', requestContext.overallCachePolicy)
          console.log('requestContext.metrics', requestContext.metrics)

          // age = Math.round((+new Date() - value.cacheTime) / 1000);
          // return { data: value.data };

          // console.log('requestContext.cache', requestContext.cache)
          // const cache = requestContext.cache
          // const generateCacheKey = options.generateCacheKey ?? ((_, key) => sha(JSON.stringify(key)))
          // const cacheKey = generateCacheKey(requestContext.operation, requestContext.operation.variables)
          // const cacheValue = await cache.get(cacheKey)
          // if (cacheValue) {
          //   console.log('cache hit', cacheKey)
          //   return { data: cacheValue }
          // }
          // console.log('cache miss', cacheKey)
          return { data: null }

        },

        async willSendResponse(requestContext) {

          // const logger = requestContext.logger || console;

          // if (!isGraphQLQuery(requestContext)) {
          //   return;
          // }

          // if (requestContext.metrics.responseCacheHit) {
          //   // Never write back to the cache what we just read from it. But do set the Age header!
          //   const http = requestContext.response.http;
          //   if (http && age !== null) {
          //     http.headers.set('age', age.toString());
          //   }
          //   return;
          // }

          // if (options.shouldWriteToCache) {
          //   const shouldWriteToCache = await options.shouldWriteToCache(
          //     requestContext,
          //   );
          //   if (!shouldWriteToCache) return;
          // }

          // const { response } = requestContext;
          // const { data } = response;

        }
      }
    }
  }
}
