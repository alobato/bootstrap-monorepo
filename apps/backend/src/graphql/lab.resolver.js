import { gql } from 'apollo-server-express'

export const typeDef = gql`
  extend type Query {
    server: JSON
  }
`

// curl -X POST -H "Content-Type: application/json" -d '{"query":"query Query { server }"}' http://localhost:8000/graphql
export const resolver = {
  Query: {
    server: async (_, __, { ip, host }) => {
      return { ip, host, serverDateTime: new Date().toISOString() }
    }
  }
}
