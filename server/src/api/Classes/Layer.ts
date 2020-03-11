import {Perceptron} from "./Perceptron";

export class Layer {

    perceptrons: Perceptron[];
    inputSize: number;
    outputs: number[];

    constructor(numPerceptrons: number = 0, inputSize: number = 0) {
        this.inputSize = inputSize;
        this.initializeLayer(numPerceptrons, inputSize);
    }

    private initializeLayer(numPerceptrons: number, inputSize: number): void {
        this.perceptrons = new Array<Perceptron>(numPerceptrons).fill(null).map(() => new Perceptron(inputSize));
    }

    public activatePerceptrons(inputs: number[]): number[] {
        this.outputs = this.perceptrons.map(p => p.activationFunction(inputs));
        return this.outputs;
    }
}
