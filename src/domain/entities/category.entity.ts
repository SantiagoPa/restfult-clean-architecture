import { CustomError } from "../errors/custom.errors";

export class CategoryEntity {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly available: boolean,
    ) { }

    static formObject(object: { [key: string]: any }) {
        const { id, _id, name, available=false } = object;
        console.log({ object });
        if (!_id && !id) throw CustomError.badRequest("Missing id");
        if (!name) throw CustomError.badRequest("Missing name");
        if (available === undefined) throw CustomError.badRequest("Missing available");
        
        return new CategoryEntity(id || _id, name, available);
    }
}