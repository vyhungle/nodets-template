/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBaseResponse {
    success: boolean;
    message: string;
    messageDetail?: string;
    code?: number;
    data?: any;
    otherData?: any;
}

export interface IPageFilter {
    totalPage: number;
    pageSize: number;
    pageIndex: number;
}

export interface IBaseServiceResponse {
    data: any;
    success: boolean;
    messageDetail?: string;
}

export interface IBaseValidate {
    status: boolean;
    messages: string[];
}

export interface IJwtCache {
    userId: number;
    role?: number;
    accessToken?: string;
    otpToken?: string;
    exp?: number;
}

export interface ITokenResponse {
    accessToken: string;
    refreshToken: string;
    dateExpired: string;
}

export interface ILoginResponse {
    qr: string;
    otpToken: string;
}
export interface ICount {
    count: number;
}
