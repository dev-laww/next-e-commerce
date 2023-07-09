import { gql } from "@apollo/client";


const typeDefs = gql`
  type Query {
    categories: [Category!]!
    category(id: Int!): Category
    products: [Product!]!
    product(id: Int!): Product
  }

  type Mutation {
    createCategory(name: String!, description: String!): Category!
    createProduct(name: String!, description: String!, categoryId: Int!): Product!
  }

  type Category {
    id: Int
    name: String!
    description: String!
    products: [Product]
  }

  type Product {
    id: Int
    name: String!
    description: String!
    category: Category!
  }
`;


export default typeDefs;