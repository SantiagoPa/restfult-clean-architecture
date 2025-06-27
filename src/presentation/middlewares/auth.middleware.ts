import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { CustomError, GetUserById, UserRepository } from "../../domain";

export class AuthMiddleware {

    constructor(
        public readonly repository: UserRepository
    ) { }

    validateJwt = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header("Authorization");
        if (!authorization) return res.status(401).json({ error: "No token provided" });

        if (!authorization.startsWith("Bearer ")) return res.status(401).json({ error: "invalid Bearer token" });

        const token = authorization.split(" ").at(1) || "";

        try {

            const payload = await jwtAdapter.validateToken<{ id: string }>(token);
            if (!payload) return res.status(401).json({ error: "invalid token" });

            const userEntity = await new GetUserById(this.repository).execute(payload.id);
            if (!userEntity) return res.status(401).json({ error: "invalid token - user" });

            // todo: validate if active user

            req.body.user = userEntity;
            next();

        } catch (error) {
            console.log(error);
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json({error: `${ error }`});
            }
            res.status(500).json({ error: "Internal server error" });
        }
    }
}