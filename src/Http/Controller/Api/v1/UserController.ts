import { Request, Response } from 'express';
import { ClientErrorResponse, SuccessResponse } from '@Providers/ResponseProvider';
import * as UserService from '@Services/UserService';

// 회원 가입
export const UserRegister = async (req: Request, res: Response): Promise<Response> => {
    const { status, message, payload } = await UserService.UserRegisterService(req);

    if (status) {
        return SuccessResponse(res, payload?.user);
    } else {
        return ClientErrorResponse(res, message ? message : ``);
    }
};

// 회원 선호 데이터 처리
export const UserPreferUpdate = async (req: Request, res: Response): Promise<Response> => {
    const { status, message, payload } = await UserService.UserPreferDataUpdate(req);

    if (status) {
        return SuccessResponse(res, payload?.prefer);
    } else {
        return ClientErrorResponse(res, message ? message : ``);
    }
};
