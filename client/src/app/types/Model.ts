export interface Model {
  layers: Array<Layer>;
}

export interface Layer {
  inputSize: number;
  perceptrons: Array<Perceptron>;
}

export interface Perceptron {
  theta: number;
  weights: Array<number>;
}
