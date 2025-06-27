import { Router } from 'express';
import { CategoriesController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { UserMongoDatasource, UserRepositoryImpl } from '../../infrastructure';
import { CategoryMongoDatasource } from '../../infrastructure/datasource/category-mongo.datasoruce';
import { CategoriesRepositoryImpl } from '../../infrastructure/repositories/categories.respository.impl';

export class CategoriesRoutes {

    static get routes(): Router {
        const router = Router();
        
        const categoryMongoDatasource = new CategoryMongoDatasource();
        const categoryRepositoryImpl  = new CategoriesRepositoryImpl(categoryMongoDatasource);
        const categoriesController = new CategoriesController(categoryRepositoryImpl);

        const userMongoDatasource = new UserMongoDatasource();
        const userRepositoryImpl = new UserRepositoryImpl(userMongoDatasource);
        const authMiddleware = new AuthMiddleware(userRepositoryImpl);

        // Definir las rutas
        router.get('/', categoriesController.getCategories);
        router.get('/:id', categoriesController.findByIdCategory);
        router.post('/', [authMiddleware.validateJwt], categoriesController.saveCategory);
        router.put('/:id', categoriesController.updateCategory);
        router.delete('/:id',categoriesController.deleteCategory);
        return router;
    }

}

