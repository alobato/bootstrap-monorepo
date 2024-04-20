import { attributes } from '../models/customer.model.js'

export default {
  up: (queryInterface) => {
    return queryInterface.createTable('Customers', attributes)
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Customers')
  }
}
