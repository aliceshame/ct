import crypto = require('crypto');



export async function random () : Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        crypto.randomBytes(12, (error_ : any, buffer_ : Buffer) => {
            if (error_) {
                reject(error_);
            } else {
                resolve(buffer_.toString('hex'));
            }
        });
    });
}

export async function paymentId () : Promise<number> {
    return await new Promise<number>((resolve, reject) => {
        crypto.randomBytes(4, (error_ : any, buffer_ : Buffer) => {
            if (error_) {
                reject(error_);
            } else {
                resolve(buffer_.readUInt32BE(0));
            }
        });
    });
}
