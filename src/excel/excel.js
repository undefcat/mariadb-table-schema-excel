const ExcelJS = require('exceljs')
const { Sheet } = require('./sheet')

async function create(tables) {
  const workbook = new ExcelJS.Workbook()

  await workbook.xlsx.readFile('binary/template.xlsx')

  workbook.creator = process.env.WRITER
  workbook.lastModifiedBy = process.env.WRITER

  const clone = workbook.getWorksheet('__template__')

  for (let table of tables) {
    const sheet = workbook.addWorksheet(table.table)

    sheet.model = {
      ...clone.model,
      mergeCells: clone.model.merges,
      name: table.table,
    }

    const builder = new Sheet(sheet, table)

    builder.build()
  }

  return workbook
}

module.exports = {
  create,
}
