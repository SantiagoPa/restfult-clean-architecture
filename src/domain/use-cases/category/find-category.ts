import { CategoryEntity } from "../../entities";
import { CategoriesRepository } from "../../repositories";

export interface FindCategoryUseCase {
    execute(id: string): Promise<CategoryEntity>
}

export class FindCategory implements FindCategoryUseCase {

    constructor(
        private readonly repository: CategoriesRepository
    ){}

    execute(id: string): Promise<CategoryEntity> {
        return this.repository.findById(id);
    }

}