import { UserEntity } from "../entities/user.entity";

export type UserEntityWithToken = Promise<{ user: Omit<UserEntity, "password">, token: string }>;