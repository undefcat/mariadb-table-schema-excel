require('dotenv').config()
const { program } = require('commander')
const app = require('./src')

program
  .description('테이블 명세서 엑셀 추출 프로그램')
  .option('-o, --output <path>', '파일명')

program.parse()

const options = program.opts()

const resultPath = options.output || 'result.xlsx'

app(resultPath)
  .then(() => {
    console.log(`${resultPath} 경로에 파일 생성 성공`)

    process.exit(0)
  })
  .catch(err => {
    console.error(err)

    process.exit(1)
  })
