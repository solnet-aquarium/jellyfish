

module.exports = function TakeScreenshot() {
  this.After(function (scenario, callback) {
    if (scenario.isFailed()) {

      browser.manage().window().setSize(1920, 1080).then(result => {
        browser.takeScreenshot().then(function (png) {
          scenario.attach(new Buffer(png, 'base64'), 'image/png', callback);
        });
      });
    } else {
      callback();
    }
  });
};

