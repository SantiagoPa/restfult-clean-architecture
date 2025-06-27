
export class UpdateCategoryDto {

    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly available: boolean,
    ){}

    static create(object: { [key: string]: any }): [string?, UpdateCategoryDto?] {
        const { id, name, available=false } = object;
        let availableBool: boolean = available;
        if(!id) return ["Missing id"];
        if (!name) return ["Missing name"];
        if (typeof available !== "boolean") {
            availableBool = ( available === "true");
        } else {
            return ["Available was boolean"]
        }

        return [undefined, new UpdateCategoryDto(id, name, availableBool)];
    }

}