import { AuthToken } from '@Entity/AuthToken';
import AppDataSource from '@Database/AppDataSource';
import { UpdateResult } from 'typeorm';

const authTokenRepository = AppDataSource.getRepository(AuthToken);

const AuthTokenRepository = {
    findAll: async (): Promise<Array<AuthToken>> => {
        return await authTokenRepository.find({
            select: [`user_id`, `token`, `status`, `expiration_at`, `created_at`],
            order: {
                id: 'asc',
            },
        });
    },
    /**
     * 사용자 토큰 조회
     * @param user_id
     */
    existsUserAuthToken: async ({ user_id }: { user_id: number }): Promise<AuthToken | null> => {
        return await authTokenRepository.findOne({
            select: [`id`, `token`, `status`, `expiration_at`, `created_at`],
            where: { user_id: user_id },
        });
    },
    /**
     * 토큰 정보 조회
     * @param token
     */
    findToken: async ({ token }: { token: string }): Promise<AuthToken | null> => {
        return await authTokenRepository.findOne({
            select: [`id`, `token`, `status`, `expiration_at`, `created_at`],
            where: { token: token },
        });
    },
    /**
     * 사용자 토큰 업데이트(기존 있을 경우)
     * @param id
     * @param token
     * @param expiration_at
     */
    updateAuthToken: async ({ id, token, expiration_at }: { id: number; token: string; expiration_at: string }): Promise<UpdateResult> => {
        return await authTokenRepository.update({ id: id }, { token: token, expiration_at: expiration_at });
    },
    /**
     * 토큰 새로 고침용 업데이트
     * @param id
     * @param token
     */
    refreshAuthToken: async ({ id, token }: { id: number; token: string }): Promise<UpdateResult> => {
        return await authTokenRepository.update({ id: id }, { token: token });
    },
    /**
     * 토큰 정보 등록(신규)
     * @param user_id
     * @param token
     * @param expiration_at
     */
    creaateAuthToken: async ({ user_id, token, expiration_at }: { user_id: number; token: string; expiration_at: string }): Promise<AuthToken> => {
        return await authTokenRepository.save(
            {
                user_id: user_id,
                token: token,
                expiration_at: expiration_at,
            },
            { transaction: false, data: false },
        );
    },
};

export default AuthTokenRepository;
