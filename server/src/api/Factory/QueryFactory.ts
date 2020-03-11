import {Insert, Select, Update} from "../Types/Database";

export default class QueryFactory {
    constructor() {
    }

    static buildQueryFrom(params: Select): string {
        let query = `SELECT ${params.select.join(', ')}`;
        query += ` FROM ${params.from} `;
        let whereParams = Object.keys(params.where);
        if (whereParams.length > 0) {
            query += `WHERE ${whereParams.map((k, index) => `${k}=$${index + 1}`).join(' AND ')}`;
        }
        return query;
    }

    static buildInsertFrom(params: Insert): string {
        let query = `INSERT INTO ${params.into}(${Object.keys(params.insert).join(', ')}) `;
        query += `VALUES(${Object.values(params.insert).map((k, index) => `$${index + 1}`)}) `;
        query += `RETURNING ${params.return}`;
        return query;
    }

    static buildUpdateFrom(params: Update): string {
        let query = `UPDATE ${params.update} `;
        let setParams = Object.keys(params.set);
        if (setParams.length > 0) {
            query += `SET ${setParams.map((k, index) => `${k}=$${index + 1}`).join(', ')} `;
        }
        let whereParams = Object.keys(params.where);
        if (whereParams.length > 0) {
            query += `WHERE ${whereParams.map((k, index) => `${k}=$${index + setParams.length + 1}`).join(' AND ')} `;
        }
        query += `RETURNING *`;
        return query;
    }
}
