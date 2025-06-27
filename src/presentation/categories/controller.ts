import { Request, Response } from "express";
import { CategoriesRepository, CreateCategoryDto, CustomError, DeleteCategory, GetCategories, PaginationDto, SaveCategory, UpdateCategory, UpdateCategoryDto } from "../../domain";
import { FindCategory } from "../../domain/use-cases/category/find-category";

export class CategoriesController {

    constructor(
        private readonly repository: CategoriesRepository,
    ) { }

    private handelError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    getCategories = (req: Request, res: Response) => {

        const { page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);
        if (error) return res.status(400).json({ error });

        new GetCategories(this.repository)
            .execute(paginationDto!)
            .then((categoriesPaginate) => res.json(categoriesPaginate))
            .catch((error) => this.handelError(error, res));
    }

    findByIdCategory = (req: Request, res: Response) => {
        const { id } = req.params;
        new FindCategory(this.repository)
            .execute(id)
            .then((category)=>res.json({ category }))
            .catch((error)=>this.handelError(error, res));
    }

    saveCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new SaveCategory(this.repository)
            .execute(createCategoryDto!, req.body.user)
            .then((category) => res.status(201).json({ category }))
            .catch((error) => this.handelError(error, res));
    }

    updateCategory = (req: Request, res: Response) => {
        const { id } = req.params;
        // return res.json({ ...req.body, id });
        const [error, updateCategoryDto] = UpdateCategoryDto.create({ id, ...req.body });
        if (error) return res.status(400).json({ error });

        new UpdateCategory(this.repository)
            .execute(updateCategoryDto!)
            .then((category)=>res.json({category}))
            .catch((error)=>this.handelError(error, res));
    }

    deleteCategory = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteCategory(this.repository)
            .execute(id)
            .then(()=>res.json({message: "category delete successfully"}))
            .catch((error)=>this.handelError(error, res));
    }


}