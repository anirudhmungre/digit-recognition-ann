import 'reflect-metadata';
import {Body, Get, JsonController, Post} from 'routing-controllers';
import {TrainingService} from "../Services/TrainingService";
import {Model} from "../Classes/Model";

@JsonController('/training')
export class TrainingController {
    constructor(
        private trainingService: TrainingService
    ) {
    }

    @Get('/')
    public root(): string {
        return "Welcome to training controller!";
    }

    @Post('/add')
    public async addTrainingData(@Body() options): Promise<string> {
        return await this.trainingService.insertTrainingData(options.input, options.output);
    }

    @Post('/reset')
    public async resetModel(@Body() options): Promise<{model: Model, success: boolean}> {
        return await this.trainingService.resetModel(options.inputSize, options.layerSizes);
    }

    @Post('/train')
    public async trainModel(@Body() options): Promise<{model: Model, success: boolean}> {
        return await this.trainingService.trainModel(options.acceptedError);
    }

    @Post('/predict')
    public async predict(@Body() options): Promise<{predictions: number[], success: boolean}> {
        return await this.trainingService.predict(options.input);
    }

}
