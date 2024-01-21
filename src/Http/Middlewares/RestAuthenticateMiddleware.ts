import { NextFunction, Request, Response } from 'express';
import { AuthenticateErrorResponse } from '@Providers/ResponseProvider';
import lodash from 'lodash';
import TokenManager from '@TokenManager';

// 인증 처리
const RestAuthenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const Authorization = `${req.header('Authorization')?.replace('Bearer ', '')}`;

    if (lodash.isEmpty(Authorization)) {
        return AuthenticateErrorResponse(res);
    }
    const tokenInfo = TokenManager.verifyAccessToken({ accessToken: Authorization });

    if (lodash.isNull(tokenInfo)) {
        return AuthenticateErrorResponse(res);
    }

    if (!lodash.isNull(tokenInfo) && !tokenInfo.expired) {
        return AuthenticateErrorResponse(res);
    } else {
        req.app.locals.user = {
            localToken: tokenInfo && tokenInfo.localToken,
            uid: tokenInfo && tokenInfo.user.uid,
            user_id: tokenInfo && tokenInfo.user.user_id,
            email: tokenInfo && tokenInfo.user.email,
            level: tokenInfo && tokenInfo.user.level,
        };

        next();
    }
};

export default RestAuthenticateMiddleware;
