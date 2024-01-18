import { Request } from 'express';
import { randomUidString, generateHexRandString, emailValidator } from '@Helper';
import UsersRepository from '@Repositories/UsersRepository';
import EmailAuthRepository from '@Repositories/EmailAuthRepository';
import Config from '@Config';
import Messages from '@Messages';
import lodash from 'lodash';
import MailSender from '@Commons/MailSender';
import bcrypt from 'bcrypt';

/**
 * 사용자 등록
 * @param req
 * @constructor
 */
export const UserRegisterService = async (
    req: Request,
): Promise<{
    status: boolean;
    message?: string;
    user?: {
        uid: string;
        auth_code?: string;
        auth_link?: string;
    };
}> => {
    const {
        email,
        password,
        name,
        gender,
        birth: { year: birthYear, month: birthMonth, day: birthDay },
    } = req.body;
    const uid = randomUidString({ len: 10, an: `a` });
    const emailAuthCode = generateHexRandString(100);

    const authLink = Config.PORT
        ? `${Config.HOSTNAME}:${Config.PORT}/web/v1/auth/email-auth/${emailAuthCode}`
        : `${Config.HOSTNAME}/web/auth/email-auth/${emailAuthCode}`;

    // 이메일 체크
    if (lodash.isUndefined(email)) {
        return { status: false, message: Messages.required.email };
    }

    // 이메일 형식 체크
    if (!emailValidator(email)) {
        return { status: false, message: Messages.validator.email };
    }

    // 비밀번호 체크
    if (lodash.isUndefined(password)) {
        return { status: false, message: Messages.required.password };
    }

    // 이름 체크
    if (lodash.isUndefined(name)) {
        return { status: false, message: Messages.required.name };
    }

    // 성별 체크
    if (lodash.isUndefined(gender)) {
        return { status: false, message: Messages.required.gender };
    }

    // 생일 체크
    if (lodash.isUndefined(birthYear) || lodash.isUndefined(birthMonth) || lodash.isUndefined(birthDay)) {
        return { status: false, message: Messages.required.birthday };
    }

    // 이메일 중복 체크
    if (await UsersRepository.emailExits({ email: email })) {
        return { status: false, message: Messages.exitsEmail };
    }

    // 등록
    const task = await UsersRepository.create({
        uid: uid,
        type: `${req.headers['client-type']}`,
        level: `${Config.USER_DEFAULT_LEVEL}`,
        email: email,
        password: `${bcrypt.hashSync(password, Config.BCRYPT_SALT)}`,
        name: name,
        gender: gender,
        birthday: `${birthYear.padStart(4, `0`)}${birthMonth.padStart(2, `0`)}${birthDay.padStart(2, `0`)}`,
        status: `${Config.USER_DEFAULT_STATUS}`,
    });

    await UsersRepository.createUserProfile({ user_id: task.id }); // 빈 프로필 생성
    await UsersRepository.createUserPreferCity({ user_id: task.id }); // 선호 지역
    await UsersRepository.createUserPreferWeekday({ user_id: task.id }); // 평일 선호 시간
    await UsersRepository.createUserPreferWeekend({ user_id: task.id }); // 주말 선호 시간

    // 이메일 인증 등록
    await EmailAuthRepository.create({ user_id: task.id, authCode: emailAuthCode });

    // local에선 안보냄
    if (Config.APP_ENV === 'production' || Config.APP_ENV === 'development') {
        MailSender.SendUserRegisterEmail({
            ToEmail: email,
            EmailAuthCode: emailAuthCode,
            Authlink: authLink,
        });
    }

    // 운영일경우 인증정보 삭제
    if (Config.APP_ENV === 'production') {
        return { status: true, user: { uid: task.uid } };
    } else {
        return { status: true, user: { uid: task.uid, auth_code: emailAuthCode, auth_link: authLink } };
    }
};

/**
 * 이메일 인증 처리
 * @param emailAuthCode
 * @constructor
 */
export const UserRegisterEmailAuthService = async ({ emailAuthCode }: { emailAuthCode: string }): Promise<{ status: boolean; message: string }> => {
    const findTask = await EmailAuthRepository.findCode({ authCode: emailAuthCode });

    if (findTask) {
        // 이미 인증한
        if (findTask.email_verified === 'Y') {
            return { status: false, message: Messages.finishedEmailAuthCode };
        }

        // 인증 처리
        await EmailAuthRepository.updateVerified({ id: findTask.id });
        await UsersRepository.emailAuthVerified({ user_id: findTask.user_id });

        return { status: false, message: Messages.success.default };
    } else {
        // 존재 하지 않는 코드
        return { status: false, message: Messages.exitsEmailAuthCode };
    }
};

export const UserPreferDataUpdate = async (req: Request): Promise<{ status: boolean; message?: string; prefer?: string }> => {
    const { city } = req.body;
    return {
        status: true,
        prefer: `${city}`,
        message: ``,
    };
};
