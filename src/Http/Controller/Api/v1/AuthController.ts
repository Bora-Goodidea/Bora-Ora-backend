import { Request, Response } from 'express';
import { SuccessResponse, ClientErrorResponse } from '@Providers/ResponseProvider';
import * as AuthService from '@Services/AuthService';

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

export const TokenInfo = async (req: Request, res: Response): Promise<Response> => {
    const { payload } = await AuthService.TokenInfo(req);
    return SuccessResponse(res, payload);
};

export const TokenRefresh = async (req: Request, res: Response) => {
    const { status, message, payload } = await AuthService.TokenRefresh(req);
    if (status) {
        return SuccessResponse(res, payload);
    } else {
        return ClientErrorResponse(res, message);
    }
};
