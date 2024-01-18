import { Users } from '@Entity/Users';
import { EmailAuth } from '@Entity/EmailAuth';
import { UserProfile } from '@Entity/UserProfile';
import { UserPreferCity } from '@Entity/UserPreferCity';
import { UserPreferWeekday } from '@Entity/UserPreferWeekday';
import { UserPreferWeekend } from '@Entity/UserPreferWeekend';
import AppDataSource from '@Database/AppDataSource';
import { UpdateResult } from 'typeorm';

const usersRepository = AppDataSource.getRepository(Users);
const emailAuthRepository = AppDataSource.getRepository(EmailAuth);
const userProfileRepository = AppDataSource.getRepository(UserProfile);
const userPreferCityRepository = AppDataSource.getRepository(UserPreferCity);
const userPreferWeekdayRepository = AppDataSource.getRepository(UserPreferWeekday);
const userPreferWeekendRepository = AppDataSource.getRepository(UserPreferWeekend);

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
        return await emailAuthRepository.save({ user_id: user_id, auth_code: authCode }, { transaction: false, data: false });
    },
    emailAuthVerified: async ({ user_id }: { user_id: number }): Promise<UpdateResult> => {
        return await usersRepository.update({ id: user_id }, { status: `020020`, email_verified: `Y` });
    },
    createUserProfile: async ({ user_id }: { user_id: number }): Promise<UserProfile> => {
        return await userProfileRepository.save({ user_id: user_id }, { transaction: false, data: false });
    },
    createUserPreferCity: async ({ user_id }: { user_id: number }): Promise<UserPreferCity> => {
        return await userPreferCityRepository.save({ user_id: user_id }, { transaction: false, data: false });
    },
    createUserPreferWeekday: async ({ user_id }: { user_id: number }) => {
        return await userPreferWeekdayRepository.save({ user_id: user_id }, { transaction: false, data: false });
    },
    createUserPreferWeekend: async ({ user_id }: { user_id: number }) => {
        return await userPreferWeekendRepository.save({ user_id: user_id }, { transaction: false, data: false });
    },
    loginInfo: async ({ email }: { email: string }): Promise<Users | null> => {
        return await usersRepository.findOne({ where: { email: email } });
    },
};

export default UsersRepository;
