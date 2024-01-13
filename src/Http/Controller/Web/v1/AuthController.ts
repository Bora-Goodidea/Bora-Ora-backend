import { Request, Response } from 'express';
import { UserRegisterEmailAuthService } from '@Services/UserService';

// 이메일 인증
export const EnailAuth = async (req: Request, res: Response): Promise<void> => {
    const { authCode } = req.params;

    const task = await UserRegisterEmailAuthService({ emailAuthCode: authCode });

    res.render('emailAuth', { message: task.message });

    res.end();
};
