const alignment = {
  vertical: 'middle',
  horizontal: 'center',
}

class Sheet {
  constructor(sheet, data) {
    this.sheet = sheet
    this.data = data
  }

  get name() {
    return this.data.table
  }

  build() {
    this.buildMeta()
    this.buildRows()
  }

  buildMeta() {
    // 시스템명
    this.setCellValue('C', 4, process.env.SYSTEM_NAME)
    // 작성일
    this.setCellValue('H', 4, process.env.WRITE_DATE)
    // 테이블명
    this.setCellValue('C', 5, this.name)
    // 작성자
    this.setCellValue('H', 5, process.env.WRITER)
    // 설명
    this.setCellValue('C', 6, this.data.comment)
  }

  buildRows() {
    this.data.rows.forEach((row, idx) => {
      const rowNum = idx + 8

      // 번호
      this.setCellValue('B', rowNum, row.num)
      // 컬럼명
      this.setCellValue('C', rowNum, row.name)
      // 설명
      this.setCellValue('D', rowNum, row.comment)
      // 타입
      this.setCellValue('E', rowNum, row.type)
      // NULLABLE
      this.setCellValue('F', rowNum, row.nullable)
      // Default
      this.setCellValue('G', rowNum, row.default)
      // Extra
      this.setCellValue('H', rowNum, row.extra)
    })
  }

  setCellValue(col, row, value) {
    const cell = this.sheet.getCell(`${col}${row}`)

    cell.value = value
    cell.alignment = alignment
  }
}

module.exports = { Sheet }
