import { Request, Response } from 'express';
import { SuccessResponse, ClientErrorResponse } from '@Providers/ResponseProvider';
import * as AuthService from '@Services/AuthService';

// 로그인 처리
export const UserLogin = async (req: Request, res: Response): Promise<Response> => {
    const { status, message, payload } = await AuthService.UserLoginAttempt(req);

    if (status && payload && payload.uid && payload.token) {
        return SuccessResponse(res, {
            uid: payload.uid,
            access_token: payload.token.access_token,
            refresh_token: payload.token.refesh_token,
        });
    } else {
        return ClientErrorResponse(res, message);
    }
};

// 토크정보
export const TokenInfo = async (req: Request, res: Response): Promise<Response> => {
    const { payload } = await AuthService.TokenInfo(req);
    return SuccessResponse(res, payload);
};

// 토큰 새로 고침
export const TokenRefresh = async (req: Request, res: Response) => {
    const { status, message, payload } = await AuthService.TokenRefresh(req);
    if (status) {
        return SuccessResponse(res, payload);
    } else {
        return ClientErrorResponse(res, message);
    }
};
