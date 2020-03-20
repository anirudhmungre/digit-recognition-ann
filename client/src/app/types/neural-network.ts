export interface Model {
  layers: Layer[];
}

export interface Layer {
  perceptrons: Perceptron[];
  inputSize: number;
}

export interface Perceptron {
  theta: number;
  weights: number[];
}
