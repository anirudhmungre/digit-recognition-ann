import {Service} from "typedi";
import {TrainingDBService} from "./DatabaseServices/TrainingDBService";
import {Model} from "../Classes/Model";
import {ModelService} from "./ModelService";

@Service()
export class TrainingService {

    model: Model;

    constructor(
        private trainingDBService: TrainingDBService,
        private modelService: ModelService
    ) {
    }

    public async insertTrainingData(input: number[], output: number): Promise<string> {
        return await this.trainingDBService.insertTrainingData(input, output);
    }

    private async getTrainingData(inputSize: number): Promise<{ input: string, output: number }[]> {
        return await this.trainingDBService.getTrainingData(inputSize);
    }

    public async trainModel(modelId: string): Promise<Model> {
        this.model = await this.modelService.getModel(modelId);
        const inputSize: number = this.model.layers[0].inputSize;
        let data: { input: number[], output: number[] }[] = (await this.getTrainingData(inputSize)).map(td => {
            const outputArray: number[] = Array<number>(10).fill(0);
            outputArray[td.output] = 1;
            return {input: JSON.parse(td.input), output: outputArray}
        });
        data.forEach(d => {
            this.model.forwardpropagation(d.input);
            let sumOfSquaredErrors = this.model.sumOfSquaredErrors(d.output);
            while (sumOfSquaredErrors > 0.001) {
                // Calculate Sum of Squared Errors
                this.model.backpropagation(d.output);
                this.model.forwardpropagation(d.input);
                sumOfSquaredErrors = this.model.sumOfSquaredErrors(d.output);
                console.log(`Sum of Squared Errors: ${sumOfSquaredErrors}`);
            }
        });
        return this.model;
    }
}
