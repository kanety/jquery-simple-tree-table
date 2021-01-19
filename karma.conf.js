// Karma configuration
// Generated on Fri Nov 23 2018 10:20:11 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      'src/*.js',
      'test/*spec.js',
      'index.html', {
        pattern: 'dist/*',
        served: true,
        included: false
      }
    ],

    proxies: {
      '/dist/': '/base/dist/',
    },


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/*.js': ['webpack', 'sourcemap'],
      'test/*spec.js': ['webpack', 'sourcemap'],
      'index.html': ['html2js']
    },

    webpack: (function() {
      var webpack = require('./webpack.config');
      webpack.mode = 'development';
      webpack.devtool = 'inline-source-map';
      webpack.module.rules.push({
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'coverage-istanbul-loader'
        }
      });
      return webpack;
    })(),


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage-istanbul'],

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      dir: __dirname + '/coverage'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless', 'FirefoxHeadless', 'EdgeHeadless', 'IE'],


    plugins: [
      'karma-*',
      require('@chiragrupani/karma-chromium-edge-launcher')
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    // concurrency: Infinity
    concurrency: 1
  })
}
