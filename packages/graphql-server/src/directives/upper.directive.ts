import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";

export function upperDirective(
  directiveName: string
): (schema: GraphQLSchema) => GraphQLSchema {
  return (schema) =>
    mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
        const upperDirective = getDirective(
          schema,
          fieldConfig,
          directiveName
        )?.[0];
        if (upperDirective) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          return {
            ...fieldConfig,
            resolve: async function (source, args, context, info) {
              const result = await resolve(source, args, context, info);
              if (typeof result === "string") {
                return result.toUpperCase();
              }
              return result;
            },
          };
        }
      },
    });
}
