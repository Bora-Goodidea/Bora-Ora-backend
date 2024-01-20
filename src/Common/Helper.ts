import crypto from 'crypto';
import { CommonChangeMysqlDateInterface } from '@Types/CommonTypes';
import Config from '@Config';

/**
 * 이메일 검사
 * @param email
 */
export const emailValidator = (email: string): boolean => {
    const mailFormat = /\S+@\S+\.\S+/;
    return !!email.match(mailFormat);
};

/**
 * mysql timestamp 변환
 * @param inputDate
 */
export const toMySqlDatetime = (inputDate: Date): string => {
    const date = new Date(inputDate);
    const dateWithOffest = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return dateWithOffest.toISOString().slice(0, 19).replace('T', ' ');
};

/**
 * 현재 시간에서 시간 추가
 * @param hours
 */
export const nowAddHours = (hours: number): Date => {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
};

/**
 * 확장자 리턴
 * @param filename
 */
export const getFileExtension = (filename: string) => {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? '' : ext[1];
};

/**
 * 랜덤 문자열
 */
export const generateRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

/**
 * 랜덤 uid 스트링
 * @param len
 * @param an
 */
export const randomUidString = ({ len, an }: { len: number; an: `a` | `n` }): string => {
    let str = '',
        i = 0;
    const min = an == 'a' ? 10 : 0;
    const max = an == 'n' ? 10 : 62;

    for (; i++ < len; ) {
        let r = (Math.random() * (max - min) + min) << 0;
        str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
    }
    return str;
};

/**
 * mysql datetime 변환
 * @param depth
 * @param date
 */
export const changeMysqlDate = (depth: `simply` | `detail`, date: string): CommonChangeMysqlDateInterface => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const convertDate = new Date(date);

    const dateYear = convertDate.getFullYear();
    const dateMonth = convertDate.getMonth();
    const dateDate = convertDate.getDate();
    const dateDay = convertDate.getDay();
    const dateHour = convertDate.getHours();
    const dateMinutes = convertDate.getMinutes();
    const dateSeconds = convertDate.getSeconds();

    if (depth === 'detail') {
        return {
            origin: convertDate,
            number: {
                year: dateYear,
                month: dateMonth,
                date: dateDate,
                day: dateDay,
                hour: dateHour,
                minutes: dateMinutes,
                seconds: dateSeconds,
            },
            string: {
                year: String(dateYear),
                month: String(dateMonth).padStart(2, '0'),
                date: String(dateDate).padStart(2, '0'),
                day: String(dateDay).padStart(2, '0'),
                hour: String(dateHour).padStart(2, '0'),
                minutes: String(dateMinutes).padStart(2, '0'),
                seconds: String(dateSeconds).padStart(2, '0'),
            },
            format: {
                step1: `${dateYear}년 ${dateMonth + 1}월 ${dateDate}일 ${
                    days[convertDate.getDay()]
                }요일 ${convertDate.getHours()}시 ${convertDate.getMinutes()}분 ${convertDate.getSeconds()}초`,
                step2: `${dateYear}년 ${dateMonth + 1}월 ${dateDate}일 ${
                    days[convertDate.getDay()]
                }요일 ${convertDate.getHours()}시 ${convertDate.getMinutes()}분`,
                step3: `${String(dateYear)}-${String(dateMonth).padStart(2, '0')}-${String(dateDay).padStart(2, '0')} ${String(dateHour).padStart(
                    2,
                    '0',
                )}:${String(dateMinutes).padStart(2, '0')}:${String(dateSeconds).padStart(2, '0')}`,
                step4: `${String(dateYear)}-${String(dateMonth).padStart(2, '0')}-${String(dateDay).padStart(2, '0')} ${String(dateHour).padStart(
                    2,
                    '0',
                )}:${String(dateMinutes).padStart(2, '0')}`,
                sinceString: timeSince(convertDate),
            },
            sinceString: timeSince(convertDate),
        };
    } else {
        return {
            format: {
                step1: `${dateYear}년 ${dateMonth + 1}월 ${dateDate}일 ${days[convertDate.getDay()]}요일`,
                step2: `${dateYear}년 ${dateMonth + 1}월 ${dateDate}일 ${
                    days[convertDate.getDay()]
                }요일 ${convertDate.getHours()}시 ${convertDate.getMinutes()}분`,
                step3: `${dateYear}년 ${dateMonth + 1}월 ${dateDate}일 ${
                    days[convertDate.getDay()]
                }요일 ${convertDate.getHours()}시 ${convertDate.getMinutes()}분 ${convertDate.getSeconds()}초`,
            },
            sinceString: timeSince(convertDate),
        };
    }
};

/**
 * 날싸를 이용 since 타일 변경
 * @param date
 */
export const timeSince = (date: Date): string => {
    const intervals = [
        { label: '년', seconds: 31536000 },
        { label: '달', seconds: 2592000 },
        { label: '일', seconds: 86400 },
        { label: '시간', seconds: 3600 },
        { label: '분', seconds: 60 },
        { label: '초', seconds: 1 },
    ];

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds === 0) {
        return `방금 전`;
    }

    const interval = intervals.find((i) => i.seconds <= seconds);

    if (interval) {
        const count = Math.floor(seconds / interval.seconds);
        return `${count}${interval.label}${count !== 1 ? '' : ''} 전`;
    }

    return `알수 없음`;
};

/**
 * 콤마 추가
 * @param num
 */
export const addComma = (num: number): string => {
    if (isNaN(num)) return '';
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
};

/**
 * uuid 생성
 */
export const generateUUID = (): string => {
    return crypto.randomUUID();
};

/**
 * 랜덤 스트링
 */
export const generateHexRandString = (length: number): string => {
    return crypto.randomBytes(length).toString('hex');
};

/**
 * 스트링에서 숫자만 리턴
 * @param inputString
 */
export const onlyNumberInString = (inputString: string) => {
    const regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
    return inputString.replace(regex, '').length > 0 ? Number(inputString.replace(regex, '')) : 0;
};

/**
 * 토큰 만료 시간 리턴
 */
export const generateAuthExpirationTime = () => {
    return toMySqlDatetime(nowAddHours(onlyNumberInString(`${Config.REFRESH_TOKEN_EXPIRESIN}`)));
};
