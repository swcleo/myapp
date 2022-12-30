import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  Query: {
    me: async (_, __, { dataSources }) => {
      return await dataSources.userAPI.findOrCreate();
    },

    books: async (_, __, { dataSources }) => {
      return await dataSources.bookAPI.getBooks();
    },

    posts: async (
      root,
      { first, after, last, before, reverse },
      { dataSources }
    ) => {
      return await dataSources.postAPI.getPosts({
        first,
        after,
        last,
        before,
        reverse,
      });
    },
  },
};

export default queries;
