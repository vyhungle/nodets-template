export interface IUser {
    userId: number;
    avatar: string;
    birthday: Date;
    email: string;
    password: string;
    phone: string;
    status: number;
    summary: string;
    username: string;
    dateCreated: Date;
    dateUpdate: Date;
    lastLogin: Date;
    roleId: number;
    roleName: string;
    name: string;
    otpToken: string;
}

export interface IRole { }

export interface IRegisterRequest {
    email: string;
    password: string;
    phone: string;
    username: string;
    dateCreated: Date;
    roleId: number;
    name: string;
    roleIdRequest: number;
}

export interface ILoginRequest {
    username: string;
    password: string;
}
export interface ILoginWithOTPRequest {
    otp: string;
    otpToken: string;
}

export interface IGetUserFilterRequest {
    pageSize: number;
    pageIndex: number;
    typeFilter?: number;
    status?: number;
}

export interface IUpdateRoleRequest {
    userId: number;
    roleId: number;
    roleIdRequest: number;
}

export interface IUpdateStatusRequest {
    userId: number;
    status: number;
}

export interface IUpdateUserRequest {
    userId: number;
    email: string;
    phone: string;
    username: string;
    name: string;
    birthday: Date;
    summary: string;
    avatar: string;
}

export interface IGetTotalUser {
    pageSize: number;
    pageIndex: number;

    type?: number;
}

export interface IChangePassword {
    newPassword: string;
    password: string;
    userIdRequest: number;
}
