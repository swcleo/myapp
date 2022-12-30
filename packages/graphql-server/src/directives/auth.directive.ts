import { GraphQLSchema, defaultFieldResolver, GraphQLString } from "graphql";
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";

export function authDirective(
  directiveName: string,
  getUserFn: (token: string) => { hasRole: (role: string) => boolean }
) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = function (source, args, context, info) {
                // const token = context?.headers?.authToken || "";
                const user = getUserFn("token");
                if (!user.hasRole(requires)) {
                  throw new Error("not authorized");
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
}

function getUser(token: string) {
  const roles = ["UNKNOWN", "USER", "REVIEWER", "ADMIN"];
  return {
    hasRole: (role: string) => {
      const tokenIndex = roles.indexOf(token);
      const roleIndex = roles.indexOf(role);
      return roleIndex >= 0 && tokenIndex >= roleIndex;
    },
  };
}
