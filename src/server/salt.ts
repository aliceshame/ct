import bcrypt = require('bcrypt-nodejs');



export async function salt () : Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(10, (error_, result_) => {
            if (error_) {
                reject(error_);
            } else {
                resolve(result_);
            }
        });
    });
}
