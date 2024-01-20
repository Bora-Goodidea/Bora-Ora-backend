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
    existsUserAuthToken: async ({ user_id }: { user_id: number }): Promise<AuthToken | null> => {
        return await authTokenRepository.findOne({ select: [`id`, `token`, `status`, `expiration_at`, `created_at`], where: { user_id: user_id } });
    },
    updateAuthToken: async ({ id, token, expiration_at }: { id: number; token: string; expiration_at: string }): Promise<UpdateResult> => {
        return await authTokenRepository.update({ id: id }, { token: token, expiration_at: expiration_at });
    },
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
