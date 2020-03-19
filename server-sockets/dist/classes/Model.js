"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Layer_1 = require("./Layer");
class Model {
    constructor(inputSize, layerSizes) {
        this.initializeLayers(inputSize, layerSizes);
    }
    initializeLayers(inputSize, layerSizes) {
        this.layers = new Array(layerSizes.length).fill(null)
            .map((l, i) => {
            if (i === 0) {
                return new Layer_1.Layer(layerSizes[0], inputSize);
            }
            return new Layer_1.Layer(layerSizes[i], layerSizes[i - 1]);
        });
    }
    run() {
    }
    forwardpropagation(input) {
        let output = input;
        this.layers.forEach(l => {
            output = l.activatePerceptrons(output);
        });
        return output;
    }
    backpropagation(expected) {
        const outputWeights = this.layers[this.layers.length - 1].weights;
        const errors = this.layers[this.layers.length - 1].errors(expected);
        const outputErrorGradients = this.layers[this.layers.length - 1].outputErrorGradients(errors);
        const outputDeltas = this.layers[this.layers.length - 1].outputDeltas(outputErrorGradients);
        outputErrorGradients.forEach((oeg, i) => {
            const hiddenGradients = this.layers[this.layers.length - 2].hiddenGradients(oeg, outputWeights[i]);
            const hiddenDeltas = this.layers[this.layers.length - 2].hiddenDeltas(hiddenGradients);
            this.layers[this.layers.length - 2].applyDeltas(hiddenDeltas);
        });
        this.layers[this.layers.length - 1].applyDeltas(outputDeltas);
    }
    error(expected) {
        const errors = this.layers[this.layers.length - 1].errors(expected);
        return errors.map(e => Math.pow(e, 2)).reduce((a, b) => a + b, 0);
    }
    prediction() {
        return this.layers[this.layers.length - 1].outputs;
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map