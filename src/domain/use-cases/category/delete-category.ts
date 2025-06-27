import { CategoriesRepository } from "../../repositories";

export interface DeleteCategoryUseCase {
    execute(id: string): Promise<void>;
}

export class DeleteCategory implements DeleteCategoryUseCase {

    constructor(
        private readonly repository: CategoriesRepository
    ){}

    execute(id: string): Promise<void> {
        return this.repository.deleteCategory(id);
    }

}