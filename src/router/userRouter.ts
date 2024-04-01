import { getUsers } from '../db/userDB.js';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const user = getUsers()
        res.status(200).json({
            success: true,
            Message: 'api get user',
            Data: user,
        });
    } catch (error) {
        /* empty */
    }
});

export default router;
