import Config from '@Config';
import AuthTokenRepository from '@Repositories/AuthTokenRepository';
import Helper from '@Helper';
import jsonwebtoken from 'jsonwebtoken';
import { AccessTokenInterface, RefreshTokenInterface } from '@Types/CommonTypes';
import lodash from 'lodash';
import Messages from '@Messages';
import authTokenRepository from '@Repositories/AuthTokenRepository';
import ms from 'ms';

const TokenManager = {
    generateLocalToken: ({ uid, user_id, email, level }: { uid: string; user_id: number; email: string; level: string }): string => {
        return Helper.encrypt(`${uid}||${user_id}||${email}||${level}`);
    },
    verifyLocalToken: ({ localToken }: { localToken: string }): { uid: string; user_id: number; email: string; level: string } | null => {
        try {
            const tokenInfo = Helper.decrypt(localToken);

            const [uid, user_id, email, level] = tokenInfo.split('||');

            return {
                uid: uid,
                user_id: Number(user_id),
                email: email,
                level: level,
            };
        } catch (e) {
            return null;
        }
    },
    generateAuthToken: async ({ uid, user_id, email, level }: { uid: string; user_id: number; email: string; level: string }): Promise<string> => {
        const localToken = TokenManager.generateLocalToken({ uid: uid, user_id: user_id, email: email, level: level });

        const existsToken = await AuthTokenRepository.existsUserAuthToken({ user_id: user_id });
        if (existsToken) {
            const updateTask = await AuthTokenRepository.updateAuthToken({
                id: existsToken.id,
                token: localToken,
                expiration_at: Helper.generateAuthExpirationTime(),
            });

            // TODO: 로그 기록 필요
            console.debug('generateAuthToken updateTask: ', updateTask);
        } else {
            const createTask = await AuthTokenRepository.creaateAuthToken({
                user_id: user_id,
                token: localToken,
                expiration_at: Helper.generateAuthExpirationTime(),
            });

            // TODO: 로그 기록 필요
            console.debug('generateAuthToken createTask: ', createTask);
        }

        return localToken;
    },
    generateRefreshAuthToken: async ({
        uid,
        user_id,
        email,
        level,
        exp,
    }: {
        uid: string;
        user_id: number;
        email: string;
        level: string;
        exp: number;
    }): Promise<{ uid: string; accessToken: string; refreshToken: string } | null> => {
        const localToken = TokenManager.generateLocalToken({ uid: uid, user_id: user_id, email: email, level: level });
        const existsToken = await AuthTokenRepository.existsUserAuthToken({ user_id: user_id });

        if (lodash.isNull(existsToken)) {
            return null;
        }

        const refreshTask = await AuthTokenRepository.refreshAuthToken({ id: existsToken.id, token: localToken });
        console.debug({ refreshTask });

        const newToken = await TokenManager.generateLoginToken({ token: localToken, exp: exp });

        return {
            uid: uid,
            accessToken: newToken.accessToken,
            refreshToken: newToken.refreshToken,
        };
    },
    generateLoginToken: async ({ token, exp }: { token: string; exp?: number }): Promise<{ accessToken: string; refreshToken: string }> => {
        const signOptions = {
            issuer: 'bora-goodidea',
            subject: 'psmever@gmail.com',
            audience: `https://github.com/Bora-Goodidea/bora-ora-backend`,
        };
        return {
            accessToken: jsonwebtoken.sign({ token: token }, `${Config.SECRET_KEY}`, {
                ...signOptions,
                expiresIn: ms(`${Config.ACCESS_TOKEN_EXPIRESIN}`) / 1000,
            }),
            refreshToken: jsonwebtoken.sign({ token: token }, `${Config.SECRET_KEY}`, {
                expiresIn: exp ? exp : ms(`${Config.REFRESH_TOKEN_EXPIRESIN}`) / 1000,
            }),
        };
    },
    verifyAccessToken: ({
        accessToken,
    }: {
        accessToken: string;
    }): { localToken: string; expired: boolean; user: { uid: string; user_id: number; email: string; level: string } } | null => {
        try {
            const nowDate = new Date();
            const verify = jsonwebtoken.verify(accessToken, `${Config.SECRET_KEY}`) as AccessTokenInterface;
            const tokenUser = TokenManager.verifyLocalToken({ localToken: verify.token });

            if (lodash.isNull(tokenUser)) {
                return null;
            }

            console.debug({ exp: new Date(verify.exp * 1000).toString(), n: new Date(new Date(nowDate.getTime())).toString() });
            console.debug({ exp: verify.exp, n: nowDate.getTime() / 1000 });

            return {
                localToken: verify.token,
                expired: verify.exp > Math.round(nowDate.getTime() / 1000),
                user: tokenUser,
            };
        } catch (e) {
            return null;
        }
    },
    verifyRefreshToken: async ({
        refreshToken,
    }: {
        refreshToken: string;
    }): Promise<{
        status: boolean;
        message: string;
        token?: {
            uid: string;
            accessToken: string;
            refreshToken: string;
        };
    }> => {
        try {
            const nowDate = new Date();
            const verify = jsonwebtoken.verify(refreshToken, `${Config.SECRET_KEY}`) as RefreshTokenInterface;

            if (verify.exp <= nowDate.getTime() / 1000) {
                return { status: false, message: Messages.expiredRefreshToken };
            }

            const findToken = await authTokenRepository.findToken({ token: verify.token });
            if (lodash.isNull(findToken)) {
                return { status: false, message: Messages.existsToken };
            }

            const tokenDateTime = new Date(findToken.expiration_at);

            const diffInMs = tokenDateTime.getTime() - nowDate.getTime();
            const diffInDays = diffInMs / (1000 * 3600 * 24);

            if (diffInDays <= 0) {
                return { status: false, message: Messages.expiredRefreshTokenInDatabase };
            }

            const tokenUser = TokenManager.verifyLocalToken({ localToken: verify.token });

            if (lodash.isNull(tokenUser)) {
                return { status: false, message: Messages.error.serverError };
            }

            const tokenRefreshInfo = await TokenManager.generateRefreshAuthToken({ ...tokenUser, exp: verify.exp });
            if (tokenRefreshInfo) {
                return {
                    status: true,
                    message: ``,
                    token: { uid: tokenRefreshInfo.uid, accessToken: tokenRefreshInfo.accessToken, refreshToken: tokenRefreshInfo.refreshToken },
                };
            } else {
                return {
                    status: true,
                    message: Messages.error.serverError,
                };
            }
        } catch (e) {
            return { status: false, message: Messages.abnormalToken };
        }
    },
};

export default TokenManager;
