import nodemailer from 'nodemailer';
import Config from '@Config';
import { Logger } from '@Logger';

const MailSender = {
    /**
     * 회원 가입 이메일 인증 메일 전송
     * @param ToEmail
     * @param EmailAuthCode
     * @constructor
     */
    SendUserRegisterEmail: ({ ToEmail, EmailAuthCode, Authlink }: { ToEmail: string; EmailAuthCode: string; Authlink: string }): void => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: Config.GMAIL_USER,
                pass: Config.GMAIL_PASSWORD,
            },
        });

        // 메일 옵션
        const mailOptions = {
            from: `"Bora-Ora Team" <${Config.GMAIL_USER}>`,
            to: ToEmail,
            subject: 'Bora-Ora 회원 가입 이메일 인증을 완료 해주세요.',
            text: EmailAuthCode,
            html: `<b>아래 링크를 클릭해서 이메일 인증을 완료해 주세요.</b><br /><br />
            <a href="${Authlink}">클릭.</a>
            `,
        };

        // 메일 발송
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                Logger.error(JSON.stringify(error));
            } else {
                Logger.info('Email sent: ' + info.response);
            }
        });
    },
    /**
     * 패스워드 초기화 메일 전송
     * @param ToEmail
     * @param ResetCode
     * @constructor
     */
    SendPasswordReset: ({ ToEmail, ResetCode }: { ToEmail: string; ResetCode: string }) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: Config.GMAIL_USER,
                pass: Config.GMAIL_PASSWORD,
            },
        });

        const serviceLink = Config.FRONT_PORT
            ? `${Config.FRONT_HOST}:${Config.FRONT_PORT}/auth/${ResetCode}/password-change`
            : `${Config.FRONT_HOST}/auth/${ResetCode}/password-change`;

        // 메일 옵션
        const mailOptions = {
            from: `"Bora Messenger Team" <${Config.GMAIL_USER}>`,
            to: ToEmail,
            subject: 'Bora Ora 비밀번호 변경을 완료 해주세요.',
            text: ResetCode,
            html: `<b>아래 링크를 클릭해서 비밀 번호 변경을 완료해 주세요.</b><br /><br />
            <a href="${serviceLink}">클릭.</a>
            `,
        };

        // 메일 발송
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                Logger.error(JSON.stringify(error));
            } else {
                Logger.info('Email sent: ' + info.response);
            }
        });
    },
};

export default MailSender;
