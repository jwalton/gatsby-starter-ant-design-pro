import request from './request';

export interface LoginParamsType {
    userName: string;
    password: string;
    mobile: string;
    captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
    return request('/api/login/account', {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export async function getFakeCaptcha(mobile: string) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}
