const { schemas } = require('./db/schema')
const { create } = require('./excel/excel')
const { setBorder } = require('./excel/border')

async function app(path) {
  const tables = await schemas()

  tables.sort((a, b) => a.table < b.table ? -1 : 1)

  const wb = await create(tables)

  const buf = await wb.xlsx.writeBuffer()

  const result = await setBorder(buf)

  await result.xlsx.writeFile(path)
}

module.exports = app
