import {RandomHelper} from "./RandomHelper";

export class Perceptron {

    private _theta: number;
    private _inputSize: number;
    private _weights: number[];
    private _inputs: number[];
    private _output: number;
    private _adjustments: number[];

    constructor(inputSize: number = 0) {
        this.theta = -1;
        this.inputSize = inputSize;
        this.weights = this.initWeights();
    }

    get theta(): number {
        return this._theta;
    }

    set theta(theta: number) {
        this._theta = theta;
    }

    get inputSize(): number {
        return this._inputSize;
    }

    set inputSize(inputSize: number) {
        this._inputSize = inputSize;
    }

    get weights(): number[] {
        return this._weights;
    }

    set weights(weights: number[]) {
        this._weights = weights;
    }

    get inputs(): number[] {
        return this._inputs;
    }

    set inputs(inputs: number[]) {
        this._inputs = inputs;
    }

    get output(): number {
        return this._output;
    }

    set output(output: number) {
        this._output = output;
    }

    get adjustments(): number[] {
        return this._adjustments;
    }

    set adjustments(adjustments: number[]) {
        this._adjustments = adjustments;
    }

    private initWeights(): number[] {
        const maximum: number = 2.4 / this.inputSize;
        const minimum: number = -maximum;
        return new Array<number>(this.inputSize).fill(0).map(() => RandomHelper.randomFloat(minimum, maximum));
    }

    public calculateOutput(inputs: number[]): number {
        this.inputs = inputs;
        inputs = inputs.map((input, index) => input * this.weights[index]);
        this.output = inputs.reduce((a, b) => a + b, 0) - this.theta;
        return this.output;
    }

    public calculateError(expected: number) {
        return expected - this.output;
    }

    public calculateOutputDelta(error: number): number {
        return this.output * (1 - this.output) * error;
    }

    public calculateDelta(parentDelta: number, parentWeight: number) {
        return this.output * (1 - this.output) * parentDelta * parentWeight;
    }

    public calculateAdjustments(errorGradient: number, learningRate: number): void {
        this.adjustments = this.weights.map((w, index) => (learningRate * this.inputs[index] * errorGradient));
        this.theta = learningRate * this.theta * errorGradient;
    }

    public adjustWeights(): void {
        this.weights = this.weights.map((w, index) => w + this.adjustments[index]);
    }
}
