const ExcelJS = require('exceljs')

const border = {
  top: { style: 'medium' },
  left: { style: 'medium' },
  bottom: { style: 'medium' },
  right: { style: 'medium' },
}

const alignment = {
  vertical: 'middle',
  horizontal: 'center',
}

function setStyle(cell) {
  cell.border = border
  cell.alignment = alignment
}

async function setBorder(buf) {
  const workbook = new ExcelJS.Workbook()

  await workbook.xlsx.load(buf)

  const templateSheet = workbook.getWorksheet('__template__')
  workbook.removeWorksheet(templateSheet.id)

  workbook.eachSheet(sheet => {
    setStyle(sheet.getCell('B2'))
    sheet.mergeCells('B2:H3')

    setStyle(sheet.getCell('C4'))
    sheet.mergeCells('C4:F4')

    setStyle(sheet.getCell('C5'))
    sheet.mergeCells('C5:F5')

    setStyle(sheet.getCell('C6'))
    sheet.mergeCells('C6:H6')
  })

  return workbook
}

module.exports = {
  setBorder,
}

