import express = require('express');
import querystring = require('querystring');

import Request = express.Request;

export async function body<Type> (req_ : Request) : Promise<Type> {
    return await new Promise<Type>((resolve, reject) => {
        let body_ : string = '';
        req_.on('data', (data_ : Buffer) => {
            body_ += data_.toString();
        });
        req_.on('end', () => {
            try {
                resolve(JSON.parse(body_) as Type);
            } catch (_) {
                reject(_);
            }
        });
    });
}

export async function qs (req_ : Request) : Promise<any> {
    return await new Promise<any>((resolve, reject) => {
        let body_ = '';

        req_.on('data', (data_ : Buffer) => {
            body_ += data_.toString();
        });

        req_.on('end', () => {
            try {
                resolve(querystring.parse(body_));
            } catch (_) {
                reject(_);
            }
        });
    });
}

