
export class HomePage {


  constructor() {}

  public clickButtonWithId(id: string) {
    return element(by.id(id)).click();
  }

}
