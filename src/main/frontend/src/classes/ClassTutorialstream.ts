import { Requirement } from "../interfaces/Requirement";
import { ClassRequirement } from "./ClassRequirement";

export class ClassTutorialstream {
  public frameworkId: string;
  public name: string;
  public requirements: Array<Requirement>;

  constructor() {
    this.frameworkId = "";
    this.name = "";
    this.requirements = [];
  }

  get _frameworkId(): string {
    return this.frameworkId;
  }

  set _frameworkId(value: string) {
    this.frameworkId = value;
  }

  get _name(): string {
    return this.name;
  }

  set _name(value: string) {
    this.name = value;
  }
}
