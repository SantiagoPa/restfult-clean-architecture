import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { UserRepository } from "../../repositories/user.repository";
import { UserEntityWithToken } from "../../types/user.types";

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDto): UserEntityWithToken;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly repository: UserRepository,
    ){}

    execute(dto: RegisterUserDto): UserEntityWithToken {
       return this.repository.registerUser(dto);
    }

}