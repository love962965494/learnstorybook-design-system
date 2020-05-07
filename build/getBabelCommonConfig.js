function resolve(moduleName) {
  return require.resolve(moduleName)
}

module.exports = function (modules) {
  const plugins = [
    // [
    //   require.resolve('@babel/plugin-transform-typescipt'),
    //   {
    //     isTSX: true
    //   }
    // ],
    resolve('babel-plugin-inline-import-data-uri'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        helpers: false,
      },
    ],
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        legacy: true,
      },
    ],
    resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-proposal-optional-chaining'),
    resolve('@babel/plugin-proposal-nullish-coalescing-operator')
  ]

  return {
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules,
          targets: {
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
          },
        },
      ],
    ],
    plugins,
  }
}
