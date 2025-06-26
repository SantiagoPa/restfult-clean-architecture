import { Request, Response } from "express";
import { CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto, UserRepository } from "../../domain";

export class AuthController {

    constructor(
        public readonly repository: UserRepository,
    ) { }

    private handelError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${error}`);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new RegisterUser(this.repository)
            .execute(registerUserDto!)
            .then(user => res.json(user))
            .catch(error => this.handelError(error, res))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new LoginUser(this.repository)
            .execute(loginUserDto!)
            .then((user)=>res.json(user))
            .catch((error)=>this.handelError(error, res))
    }

    validateEmail = (req: Request, res: Response) => {
        res.json("VALIDATE EMAIL USER");
    }
}