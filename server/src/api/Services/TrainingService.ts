import {Service} from "typedi";
import {TrainingDBService} from "./DatabaseServices/TrainingDBService";
import {Model} from "../Classes/Model";

@Service()
export class TrainingService {

    model: Model;

    constructor(
        private trainingDBService: TrainingDBService,
    ) {
    }

    public async insertTrainingData(input: number[], output: number): Promise<string> {
        return await this.trainingDBService.insertTrainingData(input, output);
    }

    private async getTrainingData(inputSize: number): Promise<{ input: string, output: number }[]> {
        return await this.trainingDBService.getTrainingData(inputSize);
    }

    public async resetModel(inputSize: number, layerSizes: number[]): Promise<{model: string, success: boolean}> {
        this.model = new Model(inputSize, layerSizes);
        return {model: JSON.stringify(this.model), success: true};
    }

    public async trainModel(acceptedError: number): Promise<{model: string, success: boolean}> {
        // this.model = await this.modelService.getModel(modelId);
        if (!this.model) {
            return {model: "", success: false};
        }
        const inputSize: number = this.model.layers[0].inputSize;
        let data: { input: number[], output: number[] }[] = (await this.getTrainingData(inputSize)).map(td => {
            const outputArray: number[] = Array<number>(10).fill(0);
            outputArray[td.output] = 1;
            return {input: JSON.parse(td.input), output: outputArray}
        });
        let sumOfSquaredErrors: number = Infinity;
        while (sumOfSquaredErrors > acceptedError) {
            sumOfSquaredErrors = 0;
            data.forEach(d => {
                this.model.forwardpropagation(d.input);
                sumOfSquaredErrors += Math.pow(this.model.error(d.output), 2);
                this.model.backpropagation(d.output);
            });
            console.log(`Sum of Squared Errors: ${sumOfSquaredErrors}`);
        }

        data.forEach(d => {
            this.model.forwardpropagation(d.input);
            console.log(`EXPECTED: ${d.output.indexOf(1)}`);
            console.log(`PREDICTED: ${this.model.prediction()}\n`);
        });
        return {model: JSON.stringify(this.model), success: true};
    }

    public async predict(input: number[]): Promise<{predictions: number[], success: boolean}> {
        if (!this.model) {
            return {predictions: [], success: false}
        }
        this.model.forwardpropagation(input);
        return {predictions: this.model.prediction(), success: true};
    }
}
