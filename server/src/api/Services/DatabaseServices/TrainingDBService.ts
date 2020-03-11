import {Service} from "typedi";
import {DBService} from "./DBService";

@Service()
export class TrainingDBService {

    private readonly tableName: string = 'TrainingData';

    constructor(
        private dbService: DBService,
    ) {
    }

    public async insertTrainingData(input: number[], output: number): Promise<string> {
        return await this.dbService.insert({
            into: this.tableName,
            insert: {
                inputSize: input.length,
                outputSize: 10,
                input: JSON.stringify(input),
                output: output
            },
            return: ['id']
        });
    }

    public async getTrainingData(inputSize: number): Promise<{input: string, output: number}[]> {
        return await this.dbService.queryAll({
            select: ['input', 'output'],
            from: this.tableName,
            where: {
                inputSize: inputSize
            }
        });
    }
}
