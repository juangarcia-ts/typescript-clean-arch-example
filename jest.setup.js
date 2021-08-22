require("dotenv/config");

const { seedDatabase } = require("./test/helpers/seed-database");

module.exports = async () => {
  await seedDatabase();
};
