const {resolveApp} = require('@efox/emp-cli/helpers/paths')
const empConfig = require(`${resolveApp('')}/emp.json`)
module.exports = ({config, env, empEnv}) => {
  const port = 8080
  const url = {
    prod: 'https://emp-react-base.yourdomain.com/',
    test: 'https://emp-react-base-test.yourdomain.com/',
    dev: `http://localhost:${port}/`,
  }
  const publicPath = empEnv ? url[empEnv] : `http://localhost:${port}/`
  // 设置项目URL
  config.output.publicPath(publicPath)
  // 设置项目端口
  config.devServer.port(port)
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        name: 'empReact',
        remotes: {},
        exposes: {
          './App': 'src/App',
        },
        shared: {
          react: {eager: true, singleton: true, requiredVersion: '^16.13.1'},
          'react-dom': {eager: true, singleton: true, requiredVersion: '^16.13.1'},
          'react-router-dom': {requiredVersion: '^5.1.2'},
        },
        // 被远程引入的文件名
        filename: 'emp.js',
      },
    }
    return args
  })

  // 配置 index.html
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // head 的 title
        title: 'EMP REACT BASE',
        // 远程调用项目的文件链接
        files: {},
      },
    }
    return args
  })
}
