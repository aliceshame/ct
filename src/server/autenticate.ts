import {
    AuthRequest, AuthMethod, AuthResponse, AuthError
} from '../schemas/auth';



import user = require('../mongo/user');



import { signup } from './signup';
import { login } from './login';
import { update } from './update-settings';
import { restore } from './restore';



export async function authenticate (request_ : AuthRequest, req_ : any) : Promise<AuthResponse> {
    return await new Promise<AuthResponse>(async (resolve, reject) => {
        try {
            let error_ : AuthError;

            switch (request_.method) {
                case AuthMethod.Login:
                    error_ = await login(request_.login, request_.password, req_);
                    break;
                case AuthMethod.Signup:
                    error_ = await signup(request_.login, request_.email, request_.name, request_.password, req_);
                    break;
                case AuthMethod.Restore:
                    error_ = await restore(request_.login, req_);
                    break;
                case AuthMethod.Update:
                    error_ = await update(request_.login, request_.email, request_.name, request_.password, request_.old, req_);
                    break;
            }

            const response_ : AuthResponse = {
                error : error_
            };
            resolve(response_);
        } catch (_) {
            reject(_);
        }
    });
}
