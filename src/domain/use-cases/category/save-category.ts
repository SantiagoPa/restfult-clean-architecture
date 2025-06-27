import { CreateCategoryDto } from "../../dtos";
import { CategoryEntity, UserEntity } from "../../entities";
import { CategoriesRepository } from "../../repositories";

export interface SaveCategoryUseCase {
    execute(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>
}

export class SaveCategory implements SaveCategoryUseCase {

    constructor(
        private readonly repository: CategoriesRepository
    ){}

    execute(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.repository.saveCategory(createCategoryDto, user);
    }

}