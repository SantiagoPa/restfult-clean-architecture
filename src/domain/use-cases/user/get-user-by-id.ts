import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface GetUserByIdUseCase {
    execute(id: string): Promise<Omit<UserEntity, "password">>;
}

export class GetUserById implements GetUserByIdUseCase {

    constructor(
        private readonly repository: UserRepository,
    ) { }

    execute(id: string): Promise<Omit<UserEntity, "password">> {
        return this.repository.findById(id);
    }

}