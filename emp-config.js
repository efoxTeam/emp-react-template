/**
 * @type {import('@efox/emp-cli').EMPConfig}
 */
module.exports = {
  webpack() {
    return {
      devServer: {
        port: 8080,
      },
    }
  },
  webpackChain(config) {
    config.plugin('html').tap(args => {
      args[0] = {
        ...args[0],
        ...{
          title: 'EMP REACT BASE',
          files: {},
        },
      }
      return args
    })
  },
  moduleFederation: {
    name: 'empReact',
    filename: 'emp.js',
    remotes: {},
    exposes: {
      './App': 'src/App',
    },
    shared: {
      react: {eager: true, singleton: true, requiredVersion: '^17.0.1'},
      'react-dom': {eager: true, singleton: true, requiredVersion: '^17.0.1'},
      'react-router-dom': {requiredVersion: '^5.1.2'},
    },
  },
}
