export class SerializationHelper {
    public static toInstance<T>(obj: T, json: string): T {
        const jsonObj = JSON.parse(json);
        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        } else {
            for (let propName in jsonObj) {
                if (jsonObj.hasOwnProperty(propName)) {
                    obj[propName] = jsonObj[propName];
                }
            }
        }

        return obj;
    }
}
