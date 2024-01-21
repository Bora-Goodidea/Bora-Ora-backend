import { Request } from 'express';
import lodash from 'lodash';
import Messages from '@Messages';
import Helper from '@Helper';
import UsersRepository from '@Repositories/UsersRepository';
import bcrypt from 'bcrypt';
import TokenManager from '@Commons/TokenManager';
import { ServiceResultInterface } from '@Types/CommonTypes';

/**
 * 로그인
 * @param req
 * @constructor
 */
export const UserLoginAttempt = async (
    req: Request,
): Promise<ServiceResultInterface<{ uid?: string; token?: { access_token: string; refesh_token: string } }>> => {
    const { email, password } = req.body;

    // 이메일 체크
    if (lodash.isUndefined(email)) {
        return { status: false, message: Messages.required.email };
    }

    // 정상 이메일 체크
    // 이메일 형식 체크
    if (!Helper.emailValidator(email)) {
        return { status: false, message: Messages.validator.email };
    }

    // 패스워드 입력체크
    // 비밀번호 체크
    if (lodash.isUndefined(password)) {
        return { status: false, message: Messages.required.password };
    }

    // 조회
    const findUser = await UsersRepository.loginInfo({ email: email });

    // 조회 되지 않는
    if (lodash.isEmpty(findUser)) {
        return { status: false, message: Messages.user.existsUserEmail };
    }

    // 인증전 사용자
    if (findUser?.status === `020010`) {
        return { status: false, message: Messages.user.needEmailAuth };
    }

    // block 사용자
    if (findUser?.status === `020030`) {
        return { status: false, message: Messages.user.blockUser };
    }

    // 알수 없는 상태 사용지
    if (findUser?.status !== `020020`) {
        return { status: false, message: Messages.user.notNormal };
    }

    // 비밀 번호 확인
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (checkPassword) {
        // 정상 로그인
        const loginToken = await TokenManager.generateLoginToken({
            token: await TokenManager.generateAuthToken({ uid: findUser.uid, user_id: findUser.id, email: findUser.email, level: findUser.level }),
        });

        return {
            status: true,
            payload: { uid: findUser.uid, token: { access_token: loginToken.accessToken, refesh_token: loginToken.refreshToken } },
        };
    } else {
        return { status: false, message: Messages.passwordCompare };
    }
};

/**
 * 토큰 정보
 * @param req
 * @constructor
 */
export const TokenInfo = async (req: Request): Promise<ServiceResultInterface<{ uid: string; level: string }>> => {
    const { uid, level } = req.app.locals.user;

    return {
        status: true,
        payload: {
            uid: uid,
            level: level,
        },
    };
};

/**
 * 토큰 새로 고침
 * @param req
 * @constructor
 */
export const TokenRefresh = async (req: Request): Promise<ServiceResultInterface<{ uid: string; access_token: string; refresh_token: string }>> => {
    const { refresh_token } = req.body;

    if (lodash.isUndefined(refresh_token)) {
        return { status: false, message: Messages.required.refreshToken };
    }

    if (lodash.isEmpty(refresh_token)) {
        return { status: false, message: Messages.required.refreshToken };
    }

    const refreshTask = await TokenManager.verifyRefreshToken({ refreshToken: refresh_token });
    if (refreshTask.status && refreshTask.token) {
        return {
            status: true,
            payload: {
                uid: refreshTask.token.uid,
                access_token: refreshTask.token.accessToken,
                refresh_token: refreshTask.token.refreshToken,
            },
        };
    } else {
        return {
            status: false,
            message: refreshTask.message,
        };
    }
};
