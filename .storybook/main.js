const path = require('path')

module.exports = {
  stories: ['../src/Intro.stories.mdx', '../src/stories/*.stories.(js|tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true
      }
    }
  ],
  webpackFinal: async config => {
    const rule = config.module.rules.find(rule => Object.keys(rule).includes('oneOf'))

    // TODO: hack写法，通过直接找到CRA中对应规则，修改使其支持antd的按需加载，后期可以进行优化
    rule.oneOf[1].options.plugins.push([require.resolve('babel-plugin-import'), { libraryName: 'antd', style: 'css' }])

    rule.oneOf.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { parser: 'typescript' }
        }
      ],
      enforce: 'pre'
    })

    return config
  }
}
