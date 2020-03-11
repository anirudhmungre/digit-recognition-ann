import {Service} from "typedi";
import {DBService} from "./DBService";
import {Model} from "../../Classes/Model";

@Service()
export class ModelDBService {

    private readonly tableName: string = 'models';

    constructor(
        private dbService: DBService,
    ) {
    }

    public async insertModel(model: Model): Promise<string> {
        return await this.dbService.insert({
            into: this.tableName,
            insert: {
                model: JSON.stringify(model)
            },
            return: ['id']
        });
    }

    public async getModel(id: string): Promise<{model: string}> {
        return await this.dbService.queryOne({
            select: ['model'],
            from: this.tableName,
            where: {
                id: id
            }
        });
    }
}
