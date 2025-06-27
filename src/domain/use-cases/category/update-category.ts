import { UpdateCategoryDto } from "../../dtos";
import { CategoryEntity } from "../../entities";
import { CategoriesRepository } from "../../repositories";

export interface UpdateCategoryUseCase {
    execute( updateCategoryDto: UpdateCategoryDto ): Promise<CategoryEntity>
}

export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly repository: CategoriesRepository
    ){}

    execute(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
        return this.repository.updateCategory(updateCategoryDto);
    }

}