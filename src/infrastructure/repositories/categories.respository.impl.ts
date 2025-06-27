import { UserEntity } from './../../domain/entities/user.entity';
import { CategoriesDatasource, CategoriesPaginate, CategoriesRepository, CategoryEntity, CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../../domain";

export class CategoriesRepositoryImpl implements CategoriesRepository {

    constructor(
        private readonly datasource: CategoriesDatasource
    ) { }

    getCategories(paginationDto: PaginationDto): Promise<CategoriesPaginate> {
        return this.datasource.getCategories(paginationDto);
    }
    findById(id: string): Promise<CategoryEntity> {
       return this.datasource.findById(id);
    }

    saveCategory(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.datasource.saveCategory(createCategoryDto, user);
    }

    updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
        return this.datasource.updateCategory(updateCategoryDto);
    }

    deleteCategory(id: string): Promise<void> {
        return this.datasource.deleteCategory(id);
    }

}