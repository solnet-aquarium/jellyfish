let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import {binding, given, when, then} from 'cucumber-tsflow';

import {HomePage} from './home.page';

@binding()
class ButtonSteps {

  private homePage: HomePage = new HomePage();

  @given(/^I am on the home page$/)
  public async onHomePage () {
    await browser.get('/');
  }

  @when(/^I click on the button with id "([^"]*)"$/)
  public async GivenIClickOnTheButtonWithId(id) {
    await this.homePage.clickButtonWithId(id);
  }

}

export = ButtonSteps;

