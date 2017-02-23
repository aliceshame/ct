import AWS = require('aws-sdk');

AWS.config.update({ region : 'us-west-2' });

export interface Sender {
    (to_ : string, name_ : string, subject_ : string, text_ : string, from_ : string) : Promise<void>;
}

export const send : Sender = async (to_, name_, subject_, text_, from_) : Promise<void> => {
    return await new Promise<void>((resolve, reject) => {
        const ses_ = new AWS.SES();

        const params_ = {
            Destination : {
                ToAddresses : [ to_ ]
            },
            Message     : {
                Subject : {
                    Data    : subject_,
                    Charset : 'utf-8'
                },
                Body    : {
                    Text : {
                        Data    : text_,
                        Charset : 'utf-8'
                    }
                }
            },
            Source      : `${from_}@capsulatime.com`
        };

        ses_.sendEmail(params_, (error_) => {
            if (error_) {
                reject(error_);
            } else {
                resolve();
            }
        });
    });
};