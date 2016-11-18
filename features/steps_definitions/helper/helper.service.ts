export class Helper {

  public openApp() {
    return browser.get('');
  }

  public goToPage(page: string) {
    return browser.get(`/${page}`);
  }

  public titleExists(title: string) {
    return element(by.cssContainingText('h1, h2, h3, h4, h5, h6', title)).isPresent();
  }

}
