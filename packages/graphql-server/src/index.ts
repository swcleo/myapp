import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { upperDirective } from "./directives/upper.directive.js";
import { restDirective } from "./directives/rest.directive.js";
import { dateDirective } from "./directives/date.directive.js";
import { authDirective } from "./directives/auth.directive.js";
import { LaunchAPI } from "./datasources/launch.js";
import { BookAPI } from "./datasources/book.js";
import { UserAPI, getUser } from "./datasources/user.js";
import { PostAPI } from "./datasources/post.js";
import { createStore } from "./utils.js";
import resolvers from "./resolvers/index.js";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const store = createStore();

export interface MyContext {
  dataSources: {
    launchAPI: LaunchAPI;
    bookAPI: BookAPI;
    userAPI: UserAPI;
    postAPI: PostAPI;
  };
}

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

schema = upperDirective("upper")(schema);
schema = restDirective("rest").restDirectiveTransformer(schema);
schema = dateDirective("date").dateDirectiveTransformer(schema);
schema = authDirective("auth", getUser).authDirectiveTransformer(schema);

const server = new ApolloServer<MyContext>({ schema });

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      dataSources: {
        launchAPI: new LaunchAPI(),
        bookAPI: new BookAPI(),
        userAPI: new UserAPI({ store }),
        postAPI: new PostAPI({ store }),
      },
    };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
