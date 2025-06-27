import jwt, { SignOptions } from 'jsonwebtoken'
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export const jwtAdapter = {

    generateToken: (paylaod: any, duration: string = "2h"): Promise<string | null> => {
        return new Promise((resolve) => {
            jwt.sign(paylaod, JWT_SEED, { expiresIn: duration } as SignOptions, (error, token) => {
                if (error) return resolve(null);
                if (!token) return resolve(null);
                resolve(token);
            });
        })
    },

    validateToken: <T>(token: string): Promise<T | null> => {
        return new Promise((resolve)=>{
            jwt.verify(token, JWT_SEED, (error, decoded)=>{
                if (error) return resolve(null);
                if (!decoded) return resolve(null);
                resolve(decoded as T);
            });
        });
    },
}