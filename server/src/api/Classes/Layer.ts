import {Perceptron} from "./Perceptron";

export class Layer {

    private _size: number;
    private _perceptrons: Perceptron[];

    constructor(size: number = 0, inputSize: number = 0) {
        this.size = size;
        this.perceptrons = this.initLayer(inputSize);
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }

    get perceptrons(): Perceptron[] {
        return this._perceptrons;
    }

    set perceptrons(perceptrons: Perceptron[]) {
        this._perceptrons = perceptrons;
    }

    private initLayer(inputSize: number): Perceptron[] {
        return new Array<Perceptron>(this.size).fill(null).map(() => new Perceptron(inputSize));
    }

    public getOutputs(inputs: number[]): number[] {
        return this.perceptrons.map((p: Perceptron) => p.calculateOutput(inputs));
    }
}
