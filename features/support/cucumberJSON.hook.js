

var Cucumber = require('cucumber');
var fs = require('fs-extra');
var path = require('path');

var JsonFormatter = Cucumber.Listener.JsonFormatter();

var reportsDir = path.join(__dirname, '../../reports/cucumber');
var reportFile = path.join(reportsDir, 'cucumber-test-results.json');

module.exports = function JsonOutputHook() {
  JsonFormatter.log = function (json) {
    fs.open(reportFile, 'w+', function (err, fd) {
      if (err) {
        fs.mkdirsSync(reportsDir);
        fd = fs.openSync(reportFile, 'w+');
      }

      fs.writeSync(fd, json);

      console.log('json file location: ' + reportFile);
    });
  };

  this.registerListener(JsonFormatter);
};
