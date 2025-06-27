import { CategoryEntity } from "../entities";

export type CategoriesPaginate = Promise<{
    categories: CategoryEntity[],
    meta: {
        page: number;
        limit: number;
        total: number;
        next: string | null;
        prev: string | null;
    }
}>;