import { Request, Response } from 'express';
import { SuccessResponse, ClientErrorResponse } from '@Providers/ResponseProvider';
import * as AuthService from '@Services/AuthService';

export const UserLogin = async (req: Request, res: Response): Promise<Response> => {
    const task = await AuthService.UserLoginAttempt(req);

    if (task.status) {
        return SuccessResponse(res, task.token);
    } else {
        return ClientErrorResponse(res, task.message);
    }
};
