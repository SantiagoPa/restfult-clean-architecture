import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { UserEntityWithToken } from "../../types/user.types";

export interface LoginUserUseCase {
    execute(dto: LoginUserDto): UserEntityWithToken;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly repository: UserRepository,
    ) { }

    execute(dto: LoginUserDto): UserEntityWithToken {
        return this.repository.loginUser(dto);
    }

}