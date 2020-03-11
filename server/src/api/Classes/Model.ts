import {Layer} from "./Layer";

export class Model {

    layers: Layer[];

    constructor(inputSize: number = 0, layerSizes: number[] = []) {
        this.initializeLayers(inputSize, layerSizes);
    }

    private initializeLayers(inputSize: number, layerSizes: number[]): void {
        this.layers = new Array<Layer>(layerSizes.length).fill(null)
            .map((l: Layer, i: number) => {
                if (i === 0) {
                    return new Layer(layerSizes[0], inputSize);
                }
                return new Layer(layerSizes[i], layerSizes[i - 1]);
            });
    }

    public forwardpropagation(input: number[]): number[] {
        let output: number[] = input;
        this.layers.forEach(l => {
            output = l.activatePerceptrons(output);
        });
        return output;
    }

    public backpropagation(expected: number[]): void {

    }
}
