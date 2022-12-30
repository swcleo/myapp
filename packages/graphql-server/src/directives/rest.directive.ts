import { GraphQLSchema } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import fetch from "node-fetch";

export function restDirective(directiveName: string) {
  return {
    restDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const restDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          if (restDirective) {
            const { url } = restDirective;
            fieldConfig.resolve = () => fetch(url).then((res) => res.text());
            return fieldConfig;
          }
        },
      }),
  };
}
