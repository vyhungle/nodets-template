import axios from 'axios';
import dotenv from 'dotenv';
import querystring from 'querystring';
dotenv.config();

/**
 * send notification to line
 * @param message
 */
export const sendNotification = (message: string) => {
    try {
        const { ACCESS_TOKEN_LINE, ENV } = process.env;
        if (ENV !== 'production') return;

        const bodyFormData = querystring.stringify({
            message: message,
        });

        axios({
            method: 'post',
            url: 'https://notify-api.line.me/api/notify',
            data: bodyFormData,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${ACCESS_TOKEN_LINE}`,
            },
        });
    } catch (error) {
        //
    }
};
