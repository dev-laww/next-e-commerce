import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';
import prisma from '../lib/prisma';

const resolvers = {
  Query: {
    categories: async () => prisma.category.findMany(),
  },
  Mutation: {
    createCategory: async (_: undefined, {name, description}: {name: string, description: string}) => {
      return prisma.category.create({
        data: {
          name: name,
          description: description
        }
      })
    }
  }
};

const typeDefs = gql`
  type Query {
    categories: [Category!]!
  }

  type Mutation {
    createCategory(name: String, description: String): Category!
  }

  type Category {
    id: Int
    name: String!
    description: String!
    products: [Product]
  }

  type Product {
    id: Int
    name: String
    description: String
    category: Category
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}