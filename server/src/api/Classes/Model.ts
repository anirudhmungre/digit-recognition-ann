import {Layer} from "./Layer";

export class Model {

    private _layers: Layer[];

    constructor(inputSize: number = 0, layerSizes: number[] = []) {
        this.layers = this.initLayers(inputSize, layerSizes);
    }

    get layers(): Layer[] {
        return this._layers;
    }

    set layers(layers: Layer[]) {
        this._layers = layers;
    }

    public get outputs(): number[] {
        return this.layers[this.layers.length-1].perceptrons.map(p => p.output);
    }

    private initLayers(inputSize: number, layerSizes: number[]): Layer[] {
        if (layerSizes.length < 2) {
            return null;
        }
        return new Array<Layer>(layerSizes.length).fill(null)
            .map((l: Layer, index: number) => {
                if (index === 0) {
                    return new Layer(layerSizes[0], inputSize);
                }
                return new Layer(layerSizes[index], layerSizes[index - 1]);
            });
    }

    public forwardpropagation(input: number[]): number[] {
        let output: number[] = input;
        this.layers.forEach(l => {
            output = l.getOutputs(output);
        });
        return output;
    }

    public backpropagation(expected: number[]): void {
        this.layers[this.layers.length-1].perceptrons.forEach((p, index) => {
            const errorGradient: number = p.calculateOutputDelta(p.calculateError(expected[index]));
            p.calculateAdjustments(errorGradient, 0.1);
            this.layers[this.layers.length-2].perceptrons.forEach((p0, index) => {
                const hiddenErrorGradient: number = p0.calculateDelta(errorGradient, p.weights[index]);
                p0.calculateAdjustments(hiddenErrorGradient, 0.1);
            });
        });

        this.layers.reverse().forEach(l => {
            l.perceptrons.forEach(p => {
                p.adjustWeights();
            });
        });
        this.layers.reverse();
    }
}
