import {Service} from "typedi";
import {ModelDBService} from "./DatabaseServices/ModelDBService";
import {Model} from "../Classes/Model";
import {SerializationHelper} from "../Classes/SerializationHelper";
import {Layer} from "../Classes/Layer";
import {Perceptron} from "../Classes/Perceptron";

@Service()
export class ModelService {

    model: Model;

    constructor(
        private modelDBService: ModelDBService,
    ) {
    }

    public async insertModel(inputSize: number, layerSizes: number[]): Promise<string> {
        return await this.modelDBService.insertModel(new Model(inputSize, layerSizes));
    }

    public async getModel(id: string): Promise<Model> {
        const modelString: { model: string } = await this.modelDBService.getModel(id);
        const model: Model = SerializationHelper.toInstance(new Model(), modelString.model);
        model.layers = model.layers.map(l => SerializationHelper.toInstance(new Layer(), JSON.stringify(l)));
        model.layers.forEach(l => {
            l.perceptrons = l.perceptrons.map(p => SerializationHelper.toInstance(new Perceptron(), JSON.stringify(p)));
        });
        this.model = model;
        return this.model;
    }
}
