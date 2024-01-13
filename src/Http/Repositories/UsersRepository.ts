import { Users } from '@Entity/Users';
import { EmailAuth } from '@Entity/EmailAuth';
import AppDataSource from '@Database/AppDataSource';

const usersRepository = AppDataSource.getRepository(Users);
const emailAuthRepository = AppDataSource.getRepository(EmailAuth);

const UsersRepository = {
    /**
     * 이메일 존재 확인
     * @param email
     */
    emailExits: async ({ email }: { email: string }): Promise<boolean> => {
        const task = await usersRepository.find({ select: [`email`], where: { email: email } });

        return task.length > 0;
    },
    /**
     * 사용자 생성
     * @param uid
     * @param type
     * @param level
     * @param email
     * @param password
     * @param name
     * @param gender
     * @param birthday
     * @param status
     */
    create: async ({
        uid,
        type,
        level,
        email,
        password,
        name,
        gender,
        birthday,
        status,
    }: {
        uid: string;
        type: string;
        level: string;
        email: string;
        password: string;
        name: string;
        gender: string;
        birthday: string;
        status: string;
    }): Promise<Users> => {
        return await usersRepository.save(
            {
                uid: uid,
                type: type,
                level: level,
                email: email,
                password: password,
                name: name,
                gender: gender,
                birthday: birthday,
                status: status,
            },
            { transaction: false, data: false },
        );
    },
    /**
     * 이메인 인증 코드 생성
     * @param user_id
     * @param authCode
     */
    emailAuthCreate: async ({ user_id, authCode }: { user_id: number; authCode: string }): Promise<EmailAuth> => {
        return await emailAuthRepository.save(
            {
                user_id: user_id,
                auth_code: authCode,
            },
            { transaction: false, data: false },
        );
    },
};

export default UsersRepository;
