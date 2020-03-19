"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Perceptron_1 = require("./Perceptron");
class Layer {
    constructor(numPerceptrons = 0, inputSize = 0) {
        this.inputSize = inputSize;
        this.initializeLayer(numPerceptrons, inputSize);
    }
    initializeLayer(numPerceptrons, inputSize) {
        this.perceptrons = new Array(numPerceptrons).fill(null).map(() => new Perceptron_1.Perceptron(inputSize));
    }
    activatePerceptrons(inputs) {
        this.inputs = inputs;
        this.outputs = this.perceptrons.map(p => p.activationFunction(this.inputs));
        return this.outputs;
    }
    get weights() {
        return this.perceptrons.map(p => p.weights);
    }
    set weights(weights) {
        this.perceptrons.forEach((p, i) => p.weights = weights[i]);
    }
    errors(expected) {
        return this.outputs.map((o, i) => expected[i] - o);
    }
    outputErrorGradients(errors) {
        return this.outputs.map((o, i) => o * (1 - o) * errors[i]);
    }
    outputDeltas(errorGradients) {
        return this.perceptrons.map((p, i) => p.outputDeltas(this.inputs, errorGradients[i]));
    }
    hiddenGradients(outputErrorGradient, outputWeights) {
        return this.perceptrons.map((p, i) => p.output * (1 - p.output) * outputErrorGradient * outputWeights[i]);
    }
    hiddenDeltas(errorGradients) {
        return this.perceptrons.map((p, i) => p.hiddenDeltas(this.inputs, errorGradients[i]));
    }
    applyDeltas(deltas) {
        this.perceptrons.forEach((p, i) => p.applyDeltas(deltas[i]));
    }
}
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map