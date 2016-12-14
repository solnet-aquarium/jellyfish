import {Helper} from "../helper/helper.service";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

import {binding, given, when, then} from 'cucumber-tsflow';

import {HomePage} from './home.page';

@binding()
class ButtonSteps {

  private helper: Helper = new Helper();
  private homePage: HomePage = new HomePage();

  @given(/^I am on the home page$/)
  public async onHomePage () {
    await this.helper.goToPage('');
  }

  @when(/^I click on the button with id "([^"]*)"$/)
  public async GivenIClickOnTheButtonWithId(id) {
    await this.homePage.clickButtonWithId(id);
  }

}

export = ButtonSteps;

