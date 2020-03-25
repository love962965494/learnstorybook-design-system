// import * as styles from './shared/styles';
// import * as global from './shared/global';
// import * as animation from './shared/animation';
// import * as icons from './shared/icons';

// export { styles, global, animation, icons };

// export * from './components';

const req = require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.ts$/)

req.keys().forEach(mod => {
  let v = req(mod)
  if (v && v.default) {
    v = v.default
  }
})

export * from './components'

// module.exports = require('./components')
