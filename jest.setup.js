require("dotenv/config");

const { seedDatabase } = require("./test/helpers/seedDatabase");

module.exports = async () => {
  await seedDatabase();
};
