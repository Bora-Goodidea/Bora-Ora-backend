import { Request, Response } from 'express';
import { ClientErrorResponse, SuccessResponse } from '@Providers/ResponseProvider';
import { UserRegisterService } from '@Services/UserService';

export const UserRegister = async (req: Request, res: Response): Promise<Response> => {
    const task = await UserRegisterService(req);

    if (task.status) {
        return SuccessResponse(res, task);
    } else {
        return ClientErrorResponse(res);
    }
};
