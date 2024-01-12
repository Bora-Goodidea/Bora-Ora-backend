import { Request } from 'express';

export const UserRegisterService = async (
    req: Request,
): Promise<{ status: boolean; email: string; passowrd: string; name: string; gender: string; birthday: string }> => {
    const { email, passowrd, name, gender, birthday } = req.body;
    // TODO: 회원 가입 처리
    return { status: true, email: email, passowrd: passowrd, name: name, gender: gender, birthday: birthday };
};
