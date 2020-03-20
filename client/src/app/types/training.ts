import {Model} from "./neural-network";

export interface Epoch {
  model: Model;
  sumOfSquaredErrors: number;
}
