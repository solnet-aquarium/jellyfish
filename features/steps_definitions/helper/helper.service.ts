const AxeBuilder = require('axe-webdriverjs');
import * as chalk from 'chalk';
import * as R from 'ramda';

export class Helper {

  public goToPage(page: string) {
    return browser.get(`/${page}`)
    .then(() => {
      return new Promise((resolve, reject) => {
        AxeBuilder(browser)
        .analyze((results) => {

          const criticalViolations = R.filter((violation: any) => {
            return violation.impact == 'critical';
          }, results.violations);

          if (R.length(criticalViolations)) {
            console.log();
            console.log(chalk.red(`Page /${page} has Accessibility Violations: ${results.violations.length}`));

            R.forEach((violation: any) => {
              const colour = violation.impact == 'critical' ? chalk.red : chalk.yellow;
              console.log(colour(`
${violation.help}
${violation.helpUrl}
id: ${violation.id}
description: ${violation.description}
nodes: ${R.length(violation.nodes)}
             `));
            }, results.violations);
            return reject();
          }

          console.log(chalk.green('No accessibility violations'));
          return resolve();
        })
      });
    });
  }

  public titleExists(title: string) {
    return element(by.cssContainingText('h1, h2, h3, h4, h5, h6', title)).isPresent();
  }

  public async pageTitleIs(title: string) {
    return element(by.cssContainingText('title', title)).isPresent();
  }

}
