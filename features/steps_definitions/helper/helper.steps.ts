import {Helper} from './helper.service';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import {binding, given, when, then} from 'cucumber-tsflow';

@binding()
class HelperSteps {

  private helper: Helper = new Helper();

  @then(/^I should see the title "([^"]*)"$/)
  public async thenIShouldSeeTheTitle (title) {
    await expect(this.helper.titleExists(title)).to.become(true);
  }

}

export = HelperSteps;

