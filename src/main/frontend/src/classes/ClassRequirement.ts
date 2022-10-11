export class ClassRequirement {
  public requirementId: string;
  public baustein: string;
  public level: string;
  public position: number;

  constructor() {
    this.requirementId = "";
    this.baustein = "";
    this.level = "";
    this.position = -1;
  }

  get _requirementId(): string {
    return this.requirementId;
  }

  set _requirementId(value: string) {
    this.requirementId = value;
  }

  get _baustein(): string {
    return this.baustein;
  }

  set _baustein(value: string) {
    this.baustein = value;
  }

  get _level(): string {
    return this.level;
  }

  set _level(value: string) {
    this.level = value;
  }

  get _position(): number {
    return this.position;
  }

  set _position(value: number) {
    this.position = value;
  }
}
