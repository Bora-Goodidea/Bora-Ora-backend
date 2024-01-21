const Messages = {
    error: {
        defaultClientError: `잘못된 요청 입니다.`,
        clientTypeNotFound: `클라이언트 정보가 존재 하지 않습니다.`,
        serverError: `처리중 문제가 발생 했습니다.`,
        authenticateError: `로그인이 필요한 서비스 입니다.`,
        emptyImageFile: `이미지 파일을 등록해 주세요.`,
        emptyNoticeFile: `서버 공지사항 내용이 없습니다.`,
    },
    required: {
        email: `이메일을 입력해 주세요.`,
        password: `비밀번호를 입력해 주세요.`,
        name: `네임을 입력해 주세요.`,
        gender: `성별을 입력해 주세요`,
        birthday: `생일을 입력해 주세요`,
        refreshToken: `토큰 정보가 존재하지 않습니다.`,
    },
    validator: {
        email: `정확한 이메일을 입력해 주세요.`,
    },
    success: {
        default: `정상 처리 하였습니다.`,
    },
    user: {
        existsUserEmail: `존재 하지 않는 사용자 입니다.`,
        needEmailAuth: `인증이 필요한 사용자 입니다.`,
        blockUser: `블럭상태 사용자 입니다.`,
        notNormal: `로그인 할수 없는 사용자 입니다.`,
    },
    exitsEmail: `사용중인 이메일 주소 입니다.`,
    exitsEmailAuthCode: `존재 하지 않은 코드 입니다.`,
    existsEmail: `사용중인 이메일 주소 입니다.`,
    existsEmailAuthCode: `존재 하지 않은 코드 입니다.`,
    finishedEmailAuthCode: `이미 인증 완료한 코드 입니다.`,
    passwordCompare: `비밀번호를 확인해 주세요.`,
    expiredRefreshToken: `로그인 시간이 만료 되었습니다. (001)`,
    expiredRefreshTokenInDatabase: `로그인 시간이 만료 되었습니다. (002)`,
    abnormalToken: `정상적인 로그인 정보가 아닙니다.`,
    existsToken: `존재 하지 않는 로그인 정보 입니다.`,
};

export default Messages;
