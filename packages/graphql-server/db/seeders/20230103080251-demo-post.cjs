"use strict";
const _ = require("lodash");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const _date = new Date()
    const data = _.range(100).map((n) => {
      const ts = _date.getTime() + 3600 * n;
      const date = new Date(ts)
      return {
        title: "A" + n.toString(),
        body: "Hello",
        createdAt: date,
        updatedAt: date,
      }
    })
    return queryInterface.bulkInsert("Posts", data);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
