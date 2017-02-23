import bcrypt = require('bcrypt-nodejs');



import { salt } from './salt';



export async function encrypt (password_ : string) {
    let salt_ = await salt();

    return await new Promise<string>((resolve, reject) => {
        bcrypt.hash(password_, salt_, () => {
        }, (error_, result_) => {
            if (error_) {
                reject(error_);
            } else {
                resolve(result_);
            }
        });
    });
}
