import { EmailAuth } from '@Entity/EmailAuth';
import AppDataSource from '@Database/AppDataSource';
import { toMySqlDatetime } from '@Helper';
import { UpdateResult } from 'typeorm';

const emailAuthRepository = AppDataSource.getRepository(EmailAuth);

const EmailAuthRepository = {
    /**
     * 생성
     * @param user_id
     * @param authCode
     */
    create: async ({ user_id, authCode }: { user_id: number; authCode: string }): Promise<EmailAuth> => {
        return await emailAuthRepository.save(
            {
                user_id: user_id,
                auth_code: authCode,
            },
            { transaction: false, data: false },
        );
    },
    /**
     * 코드 확인
     * @param authCode
     */
    findCode: async ({ authCode }: { authCode: string }): Promise<EmailAuth | null> => {
        return await emailAuthRepository.findOne({ select: [`id`, `user_id`, `auth_code`, `email_verified`], where: { auth_code: authCode } });
    },
    /**
     * 인증 처리
     * @param id
     */
    updateVerified: async ({ id }: { id: number }): Promise<UpdateResult> => {
        return emailAuthRepository.update({ id: id }, { email_verified: `Y`, email_verified_at: toMySqlDatetime(new Date()) });
    },
};

export default EmailAuthRepository;
