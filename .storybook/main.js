const path = require('path')

module.exports = {
  stories: ['../src/Intro.stories.mdx', '../src/components/**/*.stories.mdx'],
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

    rule.oneOf.splice(rule.oneOf.length - 1, 0, {
      test: /\.less$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 3
          }
        },
        {
          loader: require.resolve('less-loader'),
          options: {
            javascriptEnabled: true,
            sourceMap: true
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

    config.resolve.alias = {
      ...config.resolve.alias,
      ...{
        neco: path.join(process.cwd(), 'src/index')
      }
    }

    return config
  }
}
