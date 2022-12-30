import { GraphQLSchema, defaultFieldResolver, GraphQLString } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import formatDate from "dateformat";

export function dateDirective(directiveName: string) {
  return {
    dateDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const dateDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          if (dateDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            const { defaultFormat } = dateDirective;

            if (!fieldConfig.args) {
              throw new Error("Unexpected Error. args should be defined.");
            }

            fieldConfig.args["format"] = {
              type: GraphQLString,
            };

            fieldConfig.type = GraphQLString;
            fieldConfig.resolve = async (
              source,
              { format, ...args },
              context,
              info
            ) => {
              const newFormat = format || defaultFormat;
              const date = await resolve(source, args, context, info);
              return formatDate(date, newFormat, true);
            };
            return fieldConfig;
          }
        },
      }),
  };
}
