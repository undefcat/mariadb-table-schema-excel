const mariadb = require('mariadb')

const connection = () => {
  const pool = mariadb.createPool({
    // from .env
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'information_schema',
    connectionLimit: 10,
  })

  return pool.getConnection()
}

module.exports = {
  connection,
}
