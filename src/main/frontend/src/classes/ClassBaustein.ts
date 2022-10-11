export class ClassBaustein {
  public bausteinId: string;
  public name: string;

  constructor() {
    this.bausteinId = "";
    this.name = "";
  }

  get _bausteinId(): string {
    return this.bausteinId;
  }

  set _bausteinId(value: string) {
    this.bausteinId = value;
  }

  get _name(): string {
    return this.name;
  }

  set _name(value: string) {
    this.name = value;
  }
}
