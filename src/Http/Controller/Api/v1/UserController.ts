import { Request, Response } from 'express';
import { ClientErrorResponse, SuccessResponse } from '@Providers/ResponseProvider';
import * as UserService from '@Services/UserService';

// 회원 가입
export const UserRegister = async (req: Request, res: Response): Promise<Response> => {
    const task = await UserService.UserRegisterService(req);

    if (task.status) {
        return SuccessResponse(res, task.user);
    } else {
        return ClientErrorResponse(res, task.message ? task.message : ``);
    }
};

export const PserPreferUpdate = async (req: Request, res: Response): Promise<Response> => {
    const task = await UserService.UserPreferDataUpdate(req);

    if (task.status) {
        return SuccessResponse(res, task.prefer);
    } else {
        return ClientErrorResponse(res, task.message ? task.message : ``);
    }
};
