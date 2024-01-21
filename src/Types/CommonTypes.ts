export enum CodeTypeEnum {
    GROUP = 'group',
    CODE = 'code',
}

export enum StatusTypeEnum {
    TRUE = 'Y',
    FALSE = 'N',
}

export interface CommonUserInfoInterface {
    id?: number;
    uid: string;
    email?: string;
    nickname: string;
    type?: {
        code: string;
        name: string;
    };
    level?: {
        code: string;
        name: string;
    };
    status?: {
        code: string;
        name: string;
    };
    active?: {
        state: `Y` | 'N';
        updated_at: CommonChangeMysqlDateInterface | null;
    };
    created_at?: CommonChangeMysqlDateInterface;
    updated_at?: CommonChangeMysqlDateInterface;
    profile: {
        image: string;
    };
}

export interface CommonChangeMysqlDateInterface {
    origin?: Date;
    number?: {
        year: number;
        month: number;
        date: number;
        day: number;
        hour: number;
        minutes: number;
        seconds: number;
    };
    string?: {
        year: string;
        month: string;
        date: string;
        day: string;
        hour: string;
        minutes: string;
        seconds: string;
    };
    format: {
        step1: string;
        step2: string;
        step3?: string;
        step4?: string;
        sinceString?: string;
    };
    sinceString: string;
}

export interface ServiceResultInterface<T> {
    status: boolean;
    message?: string;
    payload?: T;
}

export interface AccessTokenInterface {
    token: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
}
export interface RefreshTokenInterface {
    token: string;
    iat: number;
    exp: number;
}
