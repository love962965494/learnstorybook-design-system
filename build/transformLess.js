const less = require('less')
const path = require('path')
const { readFileSync } = require('fs')
const postcss = require('postcss')
const postcssConfig = require('./postcssConfig')

function transformLess(lessFile, config = {}) {
  const { cwd = process.cwd() } = config
  const resolvedLessFile = path.resolve(cwd, lessFile)

  let data = readFileSync(resolvedLessFile, 'utf-8')
  data = data.replace(/^\uFEFF/, '')

  const lessOpts = {
    paths: [path.dirname(resolvedLessFile)],
    filename: resolvedLessFile,
    plugins: [],
    javascriptEnabled: true,
  }

  return less
    .render(data, lessOpts)
    .then(result => postcss(postcssConfig.plugins).process(result.css, { from: undefined }))
    .then(res => res.css)
}

module.exports = transformLess
