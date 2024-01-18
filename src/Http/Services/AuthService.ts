import { Request } from 'express';
import lodash from 'lodash';
import Messages from '@Messages';
import { emailValidator } from '@Helper';
import UsersRepository from '@Repositories/UsersRepository';
import bcrypt from 'bcrypt';

export const LoginAttempt = async (
    req: Request,
): Promise<{ status: boolean; message?: string; token?: { access_token: string; refesh_token: string } }> => {
    const { email, password } = req.body;

    // 이메일 입력체크
    if (lodash.isUndefined(email)) {
        return { status: false, message: Messages.required.email };
    }

    // 정상 이메일 체크
    if (!emailValidator(email)) {
        return { status: false, message: Messages.validator.email };
    }

    // 패스워드 입력체크
    if (lodash.isUndefined(password)) {
        return { status: false, message: Messages.required.password };
    }

    // 조회
    const findUser = await UsersRepository.loginInfo({ email: email });

    // 조회 되지 않는
    if (lodash.isEmpty(findUser)) {
        return { status: false, message: Messages.user.noUser };
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

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (checkPassword) {
        // 정상 로그인
    } else {
        return { status: false, message: Messages.passwordCompare };
    }

    return {
        status: true,
        token: {
            access_token: ``,
            refesh_token: ``,
        },
    };
};
