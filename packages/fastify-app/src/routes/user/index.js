import * as db from "../../db";

export default async function (fastify) {
  fastify.get("/:id", (req, reply) => {
    db.query(
      "SELECT * FROM users WHERE id = $1",
      [req.params.id],
      (err, result) => {
        if (err) {
          reply.send("error");
        }
        reply.send(result.rows[0]);
      }
    );
  });
}
