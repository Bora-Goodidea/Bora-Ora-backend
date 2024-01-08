import { findAll } from '@Repositories/CodeRepository';
import fs from 'fs';

/**
 * 공통 코드 데이터
 * @constructor
 */
export const GenSystemCodes = async (): Promise<{
    basic: Array<{
        type: string;
        group: string;
        code: string;
        name: string;
    }>;
    group: Array<{
        group: string;
        name: string;
        codes: Array<{
            code_id: string;
            name: string;
        }>;
    }>;
}> => {
    const getCode = await findAll();

    const group = getCode.filter((c) => c.type === `group`);
    const code = getCode.filter((c) => c.type === `code`);

    return {
        basic: getCode.map((code) => {
            const { code_id, name, group_id, type } = code;
            return {
                type: type,
                group: group_id,
                code: code_id,
                name: name,
            };
        }),
        group: group.map((g) => {
            return {
                group: g.group_id,
                name: g.name,
                codes: code
                    .filter((cf) => cf.group_id === g.group_id)
                    .map((cfg) => {
                        return {
                            code_id: cfg.code_id,
                            name: cfg.name,
                        };
                    }),
            };
        }),
    };
};

export const SystemNotice = async (): Promise<boolean | string> => {
    try {
        const notice = fs.readFileSync('storage/system-notice.txt', 'utf8');
        if (notice.length > 1) {
            return notice.trim();
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};
