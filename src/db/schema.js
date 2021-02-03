const _ = require('lodash')
const { connection } = require('./connection')

async function getTables() {
  const query = `
    SELECT TABLE_NAME 'table'
      , TABLE_COMMENT 'comment'
    FROM TABLES
    WHERE TABLE_SCHEMA = ?
  `

  let conn = await connection()

  return conn.query(query, [process.env.DB_NAME])
}

async function getSchemas() {
  const query = `
    SELECT TABLE_NAME 'table'
      , ORDINAL_POSITION 'num'
      , COLUMN_NAME 'name'
      , COLUMN_COMMENT 'comment'
      , COLUMN_TYPE 'type'
      , COLUMN_KEY 'key'
      , IS_NULLABLE 'nullable'
      , COLUMN_DEFAULT 'default'
      , EXTRA 'extra'
    FROM COLUMNS
    WHERE TABLE_SCHEMA = ?
    ORDER BY TABLE_NAME, ORDINAL_POSITION
  `

  let conn = await connection()

  return conn.query(query, [process.env.DB_NAME])
}

async function schemas() {
  let [tables, schemas] = await Promise.all([
    getTables(), getSchemas(),
  ])

  schemas = _.groupBy(schemas, 'table')

  const result = []
  for (let item of tables) {
    result.push({
      table: item.table,
      comment: item.comment,
      rows: schemas[item.table]
    })
  }

  return result
}

module.exports = {
  schemas,
}
