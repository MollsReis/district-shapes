const Pool = require('pg-pool');

const CONFIG = { host: 'db', user: 'postgres', port: 5432 };
const POOL = new Pool(CONFIG);

module.exports = {
  query: async (sql, ...params) => (await POOL.query(sql, params)).rows
};
