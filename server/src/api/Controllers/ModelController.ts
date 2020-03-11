import 'reflect-metadata';
import {Body, Get, JsonController, Post} from 'routing-controllers';
import {ModelService} from "../Services/ModelService";

@JsonController('/model')
export class ModelController {
    constructor(
        private modelService: ModelService
    ) {
    }

    @Get('/')
    public root(): string {
        return "Welcome to model controller!";
    }

    @Post('/new')
    public async newModel(@Body() options): Promise<string> {
        return await this.modelService.insertModel(options.inputSize, options.layerSizes);
    }

}
