import { Requirement } from "./Requirement";

export interface Tutorialstream {
  frameworkId: string;
  name: string;
  requirements: Array<Requirement>;
}
