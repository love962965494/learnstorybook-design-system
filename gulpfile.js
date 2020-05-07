const path = require('path')
const gulp = require('gulp')
const rimraf = require('rimraf')
const merge2 = require('merge2')
const babel = require('gulp-babel')
const through2 = require('through2')
const ts = require('gulp-typescript')
const argv = require('minimist')(process.argv.slice(2))
const transformLess = require('./build/transformLess')
const getBabelCommonConfig = require('./build/getBabelCommonConfig')

const cwd = process.cwd()

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath)
}

const libDir = getProjectPath('lib')
const esDir = getProjectPath('es')
const tsConfig = require(getProjectPath('tsconfig.json')).compilerOptions

function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css')
}

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules)

  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function (file, encoding, next) {
      this.push(file.clone())
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding)

        file.contents = Buffer.from(cssInjection(content))
        file.path = file.path.replace(/index\.js/, 'css.js')
        this.push(file)
        next()
      } else {
        next()
      }
    })
  )

  return stream.pipe(gulp.dest(modules === false ? esDir : libDir))
}

function compile(modules) {
  const dir = modules === false ? esDir : libDir
  rimraf.sync(dir)

  const less = gulp
    .src(['src/components/**/*.less'])
    .pipe(
      through2.obj(function (file, _, next) {
        this.push(file.clone())

        if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
          transformLess(file.path)
            .then(css => {
              file.contents = Buffer.from(css)
              file.path = file.path.replace(/\.less$/, '.css')

              this.push(file)
              next()
            })
            .catch(err => console.log(err))
        } else {
          next()
        }
      })
    )
    .pipe(gulp.dest(dir))

  const assets = gulp.src(['src/components/**/*.@(png|svg)']).pipe(gulp.dest(dir))

  let hasError = false

  const source = ['src/components/**/*.tsx', 'src/components/**/*.ts', 'src/components/**/*.d.ts', 'src/typings/**/*.d.ts']

  if (tsConfig.allowJs) {
    source.unshift('src/components/**/*.jsx')
  }

  const tsResult = gulp
    .src(source)
    .pipe(
      through2.obj(function (file, _, next) {
        if (file.path.match(/(\.stories|mock)\./)) {
          // 不处理与stories相关的文件
        } else {
          this.push(file.clone())
        }
        next()
      })
    )
    .pipe(
      ts(
        { ...tsConfig, noEmit: false, isolatedModules: false },
        {
          error(err) {
            ts.reporter.defaultReporter().error(err)
            hasError = true
          },
          finish: ts.reporter.defaultReporter().finish,
        }
      )
    )

  function check() {
    if (hasError && !argv['ignore-error']) {
      process.exit(1)
    }
  }

  tsResult.on('finish', check)
  tsResult.on('end', check)

  const tsFilesStream = babelify(tsResult.js, modules)
  const tsd = tsResult.dts.pipe(gulp.dest(dir))
  return merge2([less, tsFilesStream, tsd, assets])
}

gulp.task('compile-with-es', done => {
  console.log('[Parallel] Compile to es...')
  compile(false).on('finish', done)
})

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to lib...')
  compile().on('finish', done)
})

gulp.task('compile', gulp.parallel('compile-with-es', 'compile-with-lib'))
