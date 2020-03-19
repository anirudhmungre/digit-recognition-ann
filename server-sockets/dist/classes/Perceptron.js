"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RandomHelper_1 = require("./RandomHelper");
class Perceptron {
    constructor(inputSize = 0) {
        this.initializeWeights(inputSize);
    }
    initializeWeights(inputSize) {
        const maximum = 2.4 / inputSize;
        const minimum = -maximum;
        this.theta = RandomHelper_1.RandomHelper.randomFloat(minimum, maximum);
        this.weights = new Array(inputSize).fill(0).map(() => RandomHelper_1.RandomHelper.randomFloat(minimum, maximum));
    }
    activationFunction(inputs) {
        this.output = 0;
        this.weights.forEach((w, i) => {
            this.output += (w * inputs[i]);
        });
        this.output = 1 / (1 + Math.pow(Math.E, -(this.output - this.theta)));
        return this.output;
    }
    outputDeltas(inputs, errorGradient) {
        this.theta = Perceptron.alpha * (-1) * errorGradient;
        this.deltas = this.weights.map((w, i) => Perceptron.alpha * inputs[i] * errorGradient);
        return this.deltas;
    }
    hiddenDeltas(inputs, errorGradient) {
        this.theta = Perceptron.alpha * (-1) * errorGradient;
        this.deltas = this.weights.map((w, i) => Perceptron.alpha * inputs[i] * errorGradient);
        return this.deltas;
    }
    applyDeltas(deltas) {
        this.weights = this.weights.map((w, i) => w + deltas[i]);
    }
}
exports.Perceptron = Perceptron;
Perceptron.alpha = 0.1;
//# sourceMappingURL=Perceptron.js.map