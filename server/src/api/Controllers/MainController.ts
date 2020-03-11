import 'reflect-metadata';
import {Get, JsonController} from 'routing-controllers';

@JsonController('/main')
export class MainController {
    constructor() {
    }

    @Get('/')
    public async root() {
        return "Hello world!";
    }

}
