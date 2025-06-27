import { PaginationDto } from "../dtos";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { UserEntity } from "../entities";
import { CategoryEntity } from "../entities/category.entity";
import { CategoriesPaginate } from "../types";


export abstract class CategoriesRepository {
    abstract getCategories(paginationDto: PaginationDto): Promise<CategoriesPaginate>;
    abstract findById(id: string): Promise<CategoryEntity>;
    abstract saveCategory(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>;
    abstract updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity>;
    abstract deleteCategory(id: string): Promise<void>;
}