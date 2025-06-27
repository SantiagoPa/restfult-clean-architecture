import { PaginationDto } from "../../dtos";
import { CategoriesRepository } from "../../repositories";
import { CategoriesPaginate } from "../../types";

export interface GetCategoriesUseCase {
    execute(paginationDto: PaginationDto): Promise<CategoriesPaginate>;
}

export class GetCategories implements GetCategoriesUseCase {

    constructor(
        private readonly repository: CategoriesRepository,
    ){}

    execute(paginationDto: PaginationDto): Promise<CategoriesPaginate> {
       return this.repository.getCategories(paginationDto);
    }

}