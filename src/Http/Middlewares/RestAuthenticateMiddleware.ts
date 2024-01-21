import { NextFunction, Request, Response } from 'express';
import { AuthenticateErrorResponse } from '@Providers/ResponseProvider';
import lodash from 'lodash';
import TokenManager from '@TokenManager';

// 인증 처리
const RestAuthenticateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const Authorization = `${req.header('Authorization')?.replace('Bearer ', '')}`;

    // 토큰 없을시 에러
    if (lodash.isEmpty(Authorization)) {
        return AuthenticateErrorResponse(res);
    }

    const tokenInfo = TokenManager.verifyAccessToken({ accessToken: Authorization });

    // 없는 토큰 체크
    if (lodash.isNull(tokenInfo)) {
        return AuthenticateErrorResponse(res);
    }

    // 인증 만료 처리
    if (!lodash.isNull(tokenInfo) && !tokenInfo.expired) {
        return AuthenticateErrorResponse(res);
    } else {
        // 정상 토큰
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
