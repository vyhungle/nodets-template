/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
dayjs.locale('vi');
import { Request } from 'express';
import { IBaseResponse, IBaseServiceResponse } from 'model/baseModel.js';
import { IHeaderRequest } from 'model/httpModel.js';
import { sendNotification } from '../service/lineNotifyService.js';

/**
 * Lấy header request
 * @param req
 * @returns IHeaderRequest
 */
export const getHeader = (req: Request): IHeaderRequest => {
    if (req == null) return null;
    let authorization: string = req.headers.authorization;
    const accessToken: string = req.headers['access-token']?.toString();

    if (authorization) {
        authorization = authorization.replace('Bearer ', '');
    }

    const headerRequest: IHeaderRequest = {
        authorization: authorization || '',
        accessToken: accessToken || '',
    };

    return headerRequest;
};

/**
 * null object
 * @param object
 * @returns boolean
 */
export const isEmptyOrNullObject = (object: object) => {
    if (object === null || object === undefined) return true;
    return false;
};
/**
 * Null array
 * @param array
 * @returns boolean
 */
export const isEmptyOrNullArray = (array: any) => {
    if (array === null || array === undefined || array.length === 0) return true;
    return false;
};

/**
 * null object
 * @param object
 * @returns boolean
 */
export const isEmptyOrNullString = (object: string) => {
    if (object === null || object === undefined || object.trim() == '') return true;
    return false;
};
/**
 * null number
 * @param object
 * @returns
 */
export const isEmptyOrNullNumber = (object: number) => {
    if (object === null || object === undefined || object <= 0) return true;
    return false;
};
/**
 * new date 'YYYY-MM-DD HH:mm:ss'
 * @returns
 */
export const newDatePG = () => {
    // const now = new Date();
    // 2022-10-10 11:30:30
    // return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return dayjs().add(7, 'hour').format('YYYY-MM-DD HH:mm:ss');
};
/**
 * new date
 * @param day
 * @param hour
 * @param minute
 * @returns date
 */
export const newDate = (day: number = 0, hour: number = 0, minute: number = 0) => {
    return dayjs()
        .add(day, 'day')
        .add(hour, 'hour')
        .add(minute, 'minute')
        .format('YYYY-MM-DD HH:mm:ss');
};

/**
 *
 * @param error exception
 * @returns IBaseResponse
 */
export const exceptionResponse = (error: any, data: any = null) => {
    console.log(error);
    // send notification
    try {
        const messages = error.stack.split('at ').map((x: string) => x.toString().trim());
        const lstStack = messages.filter((x: string) => x.includes('webapi/dist'));
        const fullLog = `*From API* router - *Message:* ${error.message} - *Detail:* ${error?.detail
            } - *Stack:* ${lstStack.toString().trim()}`;
        sendNotification(fullLog);
    } catch (error) {
        sendNotification(`From API router - message: ${error?.message} - stack: ${error?.stack}`);
    }
    const response: IBaseResponse = {
        code: 99,
        message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        success: false,
        messageDetail: error?.message,
        data,
    };

    return response;
};
/**
 * base response model
 * @param code mã lỗi
 * @param message thông báo
 * @param data data
 * @param messageDetail chi tiết lỗi
 * @returns IBaseResponse
 */
export const baseResponse = (
    code: number,
    message: string,
    data: any,
    messageDetail: string = '',
    otherData: any = null
) => {
    const response: IBaseResponse = {
        code: code,
        message: message,
        success: code === 0,
        messageDetail: messageDetail,
        data: data,
        otherData: otherData,
    };

    return response;
};

/**
 * base response of service or DB
 * @param data
 * @param success
 * @param message
 * @returns IBaseServiceResponse
 */
export const baseServiceResponse = (data: any, success: boolean = true, message: string = '') => {
    const response: IBaseServiceResponse = {
        data: data,
        success: success,
        messageDetail: message,
    };
    return response;
};
/**
 * exception response of service or DB
 * @param error
 * @param data
 * @returns
 */
export const exceptionServiceResponse = (error: any, data: any = null) => {
    console.log(error);
    // send notification
    try {
        const messages = error.stack.split('at ').map((x: string) => x.toString().trim());
        const lstStack = messages.filter((x: string) => x.includes('webapi/dist'));
        const fullLog = `*From API* service-db - *Message:* ${error.message} - *Detail:* ${error?.detail
            } - *Stack:* ${lstStack.toString().trim()}`;
        sendNotification(fullLog);
    } catch (error) {
        sendNotification(
            `From API service-db - message: ${error?.message} - stack: ${error?.stack}`
        );
    }
    const response: IBaseServiceResponse = {
        data: data,
        success: false,
        messageDetail: error?.message,
    };
    return response;
};

/**
 * is EMAIL
 * @param email
 * @returns boolean
 */
export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
/**
 * is PHONE
 * @param phone
 * @returns boolean
 */
export const validatePhone = (phone: string) => {
    return String(phone)
        .toLowerCase()
        .match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
};
/**
 *  convert time in approx
 * @param dateStart 
 * @param dateEnd 
 * @returns { dateStart, dateEnd}
 * */
export const convertTimeInApprox = (dateStart: string = null, dateEnd: string = null) => {

    let dateStartReturn = dayjs("1/1/0001 12:00:00").format('YYYY-MM-DD HH:mm:ss');
    let dateEndReturn = dayjs("1/1/9999 12:00:00").format('YYYY-MM-DD HH:mm:ss');

    if (!isEmptyOrNullString(dateStart))
        dateStartReturn = dayjs(dateStart).format('YYYY-MM-DD HH:mm:ss');

    if (!isEmptyOrNullString(dateEnd))
        dateEndReturn = dayjs(dateEnd).format('YYYY-MM-DD HH:mm:ss');


    return {
        dateStart: dateStartReturn,
        dateEnd: dateEndReturn
    };
}