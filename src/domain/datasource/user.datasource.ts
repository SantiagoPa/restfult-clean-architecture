import { RegisterUserDto } from './../dtos/auth/register-user.dto';
import { UserEntity } from "../entities/user.entity";
import { UserEntityWithToken } from '../types/user.types';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { EmailRepository } from '../repositories/email.repository';

export abstract class UserDatasource {

    abstract registerUser(registerUserDto: RegisterUserDto): UserEntityWithToken;

    abstract loginUser(loginUserDto: LoginUserDto): UserEntityWithToken;

    abstract findById(id: number): Promise<UserEntity>;

}