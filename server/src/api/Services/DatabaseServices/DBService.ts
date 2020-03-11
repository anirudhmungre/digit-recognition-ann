import {Service} from "typedi";
import {Client} from "pg";
import {env} from "../../../env";
import logger from "../../../util/Log";
import {Insert, Select, Update} from "../../Types/Database";
import QueryFactory from "../../Factory/QueryFactory";

@Service()
export class DBService {
    public client: Client;

    constructor() {
        this.client = new Client(env.app.db.uri);
        this.client.connect().then(() => logger.debug('[DB] Connected to db'));
    }

    private async query(params: Select): Promise<any> {
        const query = QueryFactory.buildQueryFrom(params);
        const values = Object.values(params.where);
        logger.debug(`[DB] QUERYING: ${query}`);
        logger.debug(`[DB] PARAMS: ${values}`);
        return await this.client.query(query, values);
    }

    public async queryOne<T>(params: Select): Promise<T> {
        const response = await this.query(params);
        return response.rows[0];
    }

    public async queryAll<T>(params: Select): Promise<Array<T>> {
        const response = await this.query(params);
        return response.rows;
    }

    public async insert<T>(params: Insert): Promise<T> {
        const query = QueryFactory.buildInsertFrom(params);
        const values = Object.values(params.insert);
        logger.debug(`[DB] INSERTING: ${query}`);
        logger.debug(`[DB] PARAMS: ${values}`);
        const response = await this.client.query(query, values);
        return response.rows[0];
    }

    public async update<T>(params: Update): Promise<T> {
        const query = QueryFactory.buildUpdateFrom(params);
        const values = [...Object.values(params.set), ...Object.values(params.where)];
        logger.debug(`[DB] UPDATING: ${query}`);
        logger.debug(`[DB] PARAMS: ${values}`);
        const response = await this.client.query(query, values);
        return response.rows[0];
    }
}
