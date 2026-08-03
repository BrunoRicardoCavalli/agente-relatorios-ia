const pool = require("../src/config/database");

afterAll(async () => {
  if (pool) {
    await pool.end();
  }
});