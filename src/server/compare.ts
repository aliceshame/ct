import bcrypt = require('bcrypt-nodejs');



import { User } from '../schemas/user';



export async function compare (user_ : User, password_ : string) : Promise<boolean> {
    return await new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(password_, user_.password, (error_, result_) => {
            if (error_) {
                reject(error_);
            } else {
                resolve(result_);
            }
        });
    });
}
