export class UserAPI {
  store: any;

  constructor({ store }) {
    this.store = store;
  }

  async findOrCreate() {
    const users = await this.store.user.findOrCreate({
      where: { email: "example@example.com" },
    });
    return users && users[0] ? users[0] : null;
  }
}

export function getUser(token: string) {
  const roles = ["UNKNOWN", "USER", "REVIEWER", "ADMIN"];
  return {
    hasRole: (role: string) => {
      const tokenIndex = roles.indexOf(token);
      const roleIndex = roles.indexOf(role);
      console.log({ tokenIndex, roleIndex });
      return roleIndex >= 0; // && tokenIndex >= roleIndex;
    },
  };
}
