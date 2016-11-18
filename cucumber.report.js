var Report = require('cucumber-html-report');

var options = {
  source:    './reports/cucumber/cucumber-test-results.json', // source json
  dest:      './reports/cucumber',          // target directory (will create if not exists)
  name:      'index.html',        // report file name (will be index.html if not exists)
  title:     'Cucumber Report',    // Title for default template. (default is Cucumber Report)
  component: 'Jellyfish Demo',       // Subtitle for default template. (default is empty)
};

var report = new Report(options);
report.createReport();
