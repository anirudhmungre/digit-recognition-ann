import 'reflect-metadata';
import {Body, Get, JsonController, Post} from 'routing-controllers';
import {TrainingService} from "../Services/TrainingService";

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

    @Post('/train')
    public async trainModel(@Body() options): Promise<any> {
        return await this.trainingService.trainModel(options.modelId);
    }

}
