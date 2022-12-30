import { MutationResolvers } from "../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  Mutation: {
    addBook: async (_, { title, author }, { dataSources }) => {
      return await dataSources.bookAPI.addBook({ title, author });
    },
  },
};

export default mutations;
