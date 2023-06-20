import prisma from "./prisma";


const resolvers = {
  Query: {
    categories: () => prisma.category.findMany(),
    category: (_: undefined, {id}: {id: number}) => prisma.category.findFirst({where: {id: id}}),
    products: () => prisma.product.findMany(),
    product: (_: undefined, {id}: {id: number}) => prisma.product.findFirst({where: {id: id}}),
  },
  Mutation: {
    createCategory: (_: undefined, {name, description}: {name: string, description: string}) => {
      return prisma.category.create({
        data: {
          name: name,
          description: description
        }
      })
    },
    createProduct: (_: undefined, {name, description, categoryId}: {name: string, description: string, categoryId: number}) => {
      return prisma.product.create({
        data: {
         name: name,
         description: description,
         category_id: categoryId,
        },
        include: {
          category: true
        }
     })
    }
  }
};


export default resolvers;
