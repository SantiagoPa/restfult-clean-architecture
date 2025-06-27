import { bcryptAdapter, envs, jwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserDatasource, UserEntity, UserEntityWithToken } from "../../domain";
import { EmailRepository } from "../../domain/repositories/email.repository";
import { SendEmail } from "../../domain/use-cases/email/send-email";

export class UserMongoDatasource implements UserDatasource {

    constructor(
        private readonly emailRepository: EmailRepository
    ) { }

    async registerUser(registerUserDto: RegisterUserDto): UserEntityWithToken {
        const isExistUser = await UserModel.findOne({ email: registerUserDto.email });
        if (isExistUser) throw CustomError.badRequest('Email already exist');
        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(registerUserDto.password);
            await user.save();

            //Email de confirmacion
            await this.sendEmailValidateLink(user.email);

            const { password, ...userEntity } = UserEntity.formObject(user);
            const token = await jwtAdapter.generateToken({ id: userEntity.id });
            if (!token) throw CustomError.internalServer("Error creating jwt");

            return {
                user: userEntity,
                token: token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    async loginUser(loginUserDto: LoginUserDto): UserEntityWithToken {
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest("User not exist!");

        const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatch) throw CustomError.badRequest("Invalid credentials");

        const { password, ...userEntity } = UserEntity.formObject(user);

        const token = await jwtAdapter.generateToken({ id: userEntity.id });
        if (!token) throw CustomError.internalServer("Error creating jwt");

        return {
            user: userEntity,
            token: token,
        };
    }

    async validateEmail(token: string): Promise<boolean> {
        const payload = await jwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorize("invalid token");
        const { email } = payload as { email: string; };

        if (!email) throw CustomError.internalServer("email not in token");

        const user = await UserModel.findOne({ email: email });

        if (!user) throw CustomError.internalServer(`user with email: ${email} - not exist!`);
        user.emailValidated = true;
        await user.save();
        return true;
    }

    findById(id: number): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    private async sendEmailValidateLink(email: string): Promise<void> {
        const token = await jwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token.toString()}`;
        
        const html = `
            <h1>validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const isSend = await new SendEmail(this.emailRepository).execute({
            to: email,
            subject: "Validate your email",
            htmlBody: html
        });

        if (!isSend) throw CustomError.internalServer('Error sending email');

    }

}