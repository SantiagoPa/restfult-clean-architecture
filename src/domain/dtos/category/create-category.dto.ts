
export class CreateCategoryDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ){}

    static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
        const { name, available=false } = object;
        let availableBool: boolean = available;
        if (!name) return ["Missing name"];
        if (typeof available !== "boolean") {
            availableBool = ( available === "true");
        } else {
            return ["Available was boolean"]
        }

        return [undefined, new CreateCategoryDto(name, availableBool)];
    }

}