import { LoginUserDto, RegisterUserDto, UserDatasource, UserEntity, UserEntityWithToken, UserRepository } from "../../domain";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly datasource: UserDatasource
    ) { }

    registerUser(registerUserDto: RegisterUserDto): UserEntityWithToken {
        return this.datasource.registerUser(registerUserDto);
    }

    loginUser(loginUserDto: LoginUserDto): UserEntityWithToken {
        return this.datasource.loginUser(loginUserDto);

    }

    findById(id: number): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    validateEmail(token: string): Promise<boolean> {
        return this.datasource.validateEmail(token);
    }

}