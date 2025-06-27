import { Router } from 'express';
import { AuthController } from './controller';
import { UserMongoDatasource, UserRepositoryImpl } from '../../infrastructure';
import { EmailNodeMailerDatasoruce } from '../../infrastructure/datasource/email-nodemailer.datasource';
import { envs } from '../../config';
import { EmailRepositoryImpl } from '../../infrastructure/repositories/email.repository.impl';

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();
        const emailDatasource = new EmailNodeMailerDatasoruce(envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL);

        const emailRepository = new EmailRepositoryImpl(emailDatasource);

        const userMongoDatasoruce = new UserMongoDatasource(emailRepository);
        const userRepository = new UserRepositoryImpl(userMongoDatasoruce);
        const authController = new AuthController(userRepository);
        // Definir las rutas
        router.post('/login', authController.loginUser);
        router.post('/register', authController.registerUser);
        router.get('/validate-email/:token', authController.validateEmail);
        return router;
    }

}

