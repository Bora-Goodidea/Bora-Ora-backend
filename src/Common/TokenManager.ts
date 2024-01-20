import Config from '@Config';
import bcrypt from 'bcrypt';
import AuthTokenRepository from '@Repositories/AuthTokenRepository';
import { toMySqlDatetime, generateAuthExpirationTime } from '@Helper';
import jsonwebtoken from 'jsonwebtoken';

const TokenManager = {
    generateAuthToken: async ({ user_id, email }: { user_id: number; email: string }): Promise<string> => {
        const localToken = bcrypt.hashSync(`${user_id}-${email}`, Number(Config.BCRYPT_SALT));
        const existsToken = await AuthTokenRepository.existsUserAuthToken({ user_id: user_id });
        if (existsToken) {
            const updateTask = await AuthTokenRepository.updateAuthToken({
                id: existsToken.id,
                token: localToken,
                expiration_at: generateAuthExpirationTime(),
            });

            // TODO: 로그 기록 필요
            console.debug(updateTask);
        } else {
            const createTask = await AuthTokenRepository.creaateAuthToken({
                user_id: user_id,
                token: localToken,
                expiration_at: toMySqlDatetime(new Date()),
            });

            // TODO: 로그 기록 필요
            console.debug(createTask);
        }

        return localToken;
    },
    generateLoginToken: async ({ token }: { token: string }): Promise<{ accessToken: string; refreshToken: string }> => {
        return {
            accessToken: jsonwebtoken.sign({ token: token }, Config.SECRET_KEY ? Config.SECRET_KEY : 'secret', {
                expiresIn: `${Config.ACCESS_TOKEN_EXPIRESIN}`,
            }),
            refreshToken: jsonwebtoken.sign({ token: token }, Config.SECRET_KEY ? Config.SECRET_KEY : 'secret', {
                expiresIn: `${Config.REFRESH_TOKEN_EXPIRESIN}`,
            }),
        };
    },
};

export default TokenManager;
