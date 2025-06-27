import { isObjectIdOrHexString } from "mongoose";
import { CategoryModel } from "../../data";
import { CategoriesDatasource, CategoriesPaginate, CategoryEntity, CreateCategoryDto, CustomError, PaginationDto, UpdateCategoryDto, UserEntity } from "../../domain";

export class CategoryMongoDatasource implements CategoriesDatasource {


    async getCategories(paginationDto: PaginationDto): Promise<CategoriesPaginate> {
        try {
            const { page, limit } = paginationDto;

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
            ]);

            return {
                categories: categories.map((category) => CategoryEntity.formObject(category)),
                meta: {
                    page,
                    limit,
                    total,
                    next: (page <= Math.floor(total / limit)) ? `/api/categories?page=${(page + 1)}&limit=${limit}` : null,
                    prev: (page - 1 > 0) ? `/api/categories?page=${(page - 1)}&limit=${limit}` : null,
                }
            }
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Internal Server Error");
        }
    }

    async findById(id: string): Promise<CategoryEntity> {
        this.validateIdMongo(id);
        const category = await CategoryModel.findById(id);
        if (!category) throw CustomError.badRequest(`Catgory with id:${id} not exist!`);
        const categoryEntity = CategoryEntity.formObject(category);
        return categoryEntity;
    }

    async saveCategory(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        const categoryExist = await CategoryModel.findOne({ name: createCategoryDto.name });
        if (categoryExist) throw CustomError.badRequest(`Catgory: ${createCategoryDto.name} already exist!`);
        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            });
            category.save();
            const categoryEntity = CategoryEntity.formObject(category);

            return categoryEntity;

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Internal Server Error");
        }
    }

    async updateCategory(updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
        const { id, ...update } = updateCategoryDto;
        this.validateIdMongo(id);
        await this.findById(id);
        try {
            const updateCategory = await CategoryModel.findByIdAndUpdate(
                id,
                update
            );
            const objectCategory = {
                id: updateCategory?._id,
                ...update
            }
            const categoryEntity = CategoryEntity.formObject(objectCategory);
            return categoryEntity;
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Internal Server Error");
        }

    }

    async deleteCategory(id: string): Promise<void> {
        this.validateIdMongo(id);
        await this.findById(id);
        try {
            await CategoryModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer("Internal Server Error");
        }
    }

    private validateIdMongo(id: string) {
        const isIdvalid = isObjectIdOrHexString(id);
        if (!isIdvalid) throw CustomError.badRequest(`id: ${id} is not valid`);
    }
}