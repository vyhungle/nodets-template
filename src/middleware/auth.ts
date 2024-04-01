import * as helpers from '../common/helper.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = {
    authorizationRequest: (
        res: express.Request,
        req: express.Response,
        next: express.NextFunction
    ) => {
        const { AUTHKEY } = process.env;
        const header = helpers.getHeader(res);
        if (header.authorization == AUTHKEY) return next();

        req.status(401).send('Invalid token !');
    },

}
export default authMiddleware;
