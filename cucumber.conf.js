
require('ts-node').register({
  compilerOptions: {
    module: "commonjs",
    target: "es6",
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    moduleResolution: "node",
    declaration: true,
    allowSyntheticDefaultImports: true,
    types: [
        "node",
        "angular-protractor",
        "bluebird",
        "chalk",
        "form-data",
        "jasmine",
        "moment",
        "node",
        "q",
        "ramda",
        "request",
        "request-promise",
        "selenium-webdriver"
    ],
    typeRoots: ["./node_modules/@types", "./typings/globals"]
  }
});

const E2E_BROWSER = process.env['E2E_BROWSER'] || /^win/.test(process.platform) ? 'IE' : 'CHROME';
const E2E_BASE_URL = process.env['E2E_BASE_URL'] || 'https://solnet.co.nz';

console.log('RUNNING CUCUMBER TESTS ON PLATFORM: ', process.platform);
console.log('RUNNING CUCUMBER TESTS IN BROWSER : ', E2E_BROWSER);
console.log('RUNNING CUCUMBER TESTS ON URL     : ', E2E_BASE_URL);

exports.config = Object.assign(getBaseConfig(), getBrowserConfig(E2E_BROWSER));

function getBrowserConfig(browser){
  switch(browser){

    case 'IE':
      return {
        seleniumArgs: ['-Dwebdriver.ie.driver=node_modules/protractor/node_modules/webdriver-manager/selenium/IEDriverServer_x64_2.53.1.exe'],
        capabilities: {
          'browserName': 'internet explorer',
          'platform': 'ANY',
          'version': '11',
        }
      };

    case 'CHROME':
      return {
        capabilities: {
          browserName: 'chrome',
          'chromeOptions': {
            'args': ['show-fps-counter=true']
          }
        },
        directConnect: ! process.env.SAUCE_USERNAME
      };


    case 'PHANTOM':
    default:
      return {
        browserName: 'phantomjs'
      };
  }
}

function getBaseConfig(){
  return {

    getPageTimeout: 60000,
    allScriptsTimeout: 30000,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    // Credientials for Saucelabs
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    onPrepare: function() {
      browser.ignoreSynchronization = true;
    },

    // We can use the
    baseUrl: E2E_BASE_URL,

    // Spec patterns are relative to this directory.
    specs: ['features/**/*.feature'],

    cucumberOpts: {
      timeout: 30000,

      require: [
        './features/**/*.steps.ts',
        './features/support/env.js',
        './features/support/*.hook.js'
      ],
      tags: ["~@ignore"],
      format: 'pretty',
      profile: false,
      'no-source': true
    }
  };
}
