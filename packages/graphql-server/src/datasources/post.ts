import { QueryTypes } from "sequelize";

export class PostAPI {
  store: any;

  constructor({ store }) {
    this.store = store;
  }

  async getPosts({ first, after, last, before, reverse }) {
    console.log({ first, after, last, before, reverse })

    if (!first && after) throw new Error('after must be with first')
    if ((last && !before) || (!last && before)) throw new Error('last and before must be used together')
    if (first && after && last && before) throw new Error('Incorrect Arguments Usage.')


    const db = await this.store.db

    let posts;

    if (first) {
      posts = after
        ? await db.query(
          "SELECT *, count(*) OVER() AS count FROM posts WHERE createdAt < ? ORDER BY createdAt DESC LIMIT ?",
          { replacements: [new Buffer(after, 'base64').toString(), first], type: QueryTypes.SELECT }
        )
        : await db.query("SELECT * FROM posts ORDER BY createdAt DESC LIMIT ?;", { replacements: [first], type: QueryTypes.SELECT });
    }


    if (last) {
      posts = await db.query(
        `SELECT * FROM (
            SELECT *, count(*) OVER() AS count FROM posts WHERE createdAt > ? ORDER BY createdAt ASC LIMIT ?
         ) posts ORDER BY createdAt DESC`, { replacements: [new Buffer(before, 'base64').toString(), last], type: QueryTypes.SELECT }
      );
    }

    const countWithoutLimit = posts.length;
    const query = await db.query("SELECT count(*) as number FROM posts;", { type: QueryTypes.SELECT });
    const allCount = query[0].number;

    return {
      edges: posts.map((post) => ({
        cursor: Buffer.from(post.createdAt).toString("base64"),
        node: post,
      })),
      pageInfo: {
        hasNextPage: first
          ? countWithoutLimit > first
          : allCount > countWithoutLimit,
        hasPreviousPage: last
          ? countWithoutLimit > last
          : allCount > countWithoutLimit,
        totalPageCount: Math.ceil(allCount / (first || last)),
      },
    };

  }
}
