#!/usr/bin/env node
import lodash from 'lodash';
import MysqlConnect from '@Database/MysqlConnect';
import { CodeTypeEnum } from '@Types/CommonTypes';
import { exit } from 'node:process';
import Codes from '@Codes';
import fs from 'fs';

console.debug(`######################################################################`);
(async () => {
    const conn = await MysqlConnect.getConnection();
    await conn.query(`SET FOREIGN_KEY_CHECKS=0;`);
    await conn.query(`truncate table codes;`);

    console.debug(`:::::::::::::::::::::::::::::Codes Start::::::::::::::::::::::::::::::`);

    const codeData: Array<{ type: CodeTypeEnum; group_id: string; code_id: string; name: string }> = [];

    lodash.forEach(Codes, (c) => {
        codeData.push({ type: `group` as CodeTypeEnum, group_id: c.id, code_id: `${c.id}000`, name: c.name });
        lodash.forEach(c.list, (l) => {
            codeData.push({
                type: `code` as CodeTypeEnum,
                group_id: c.id,
                code_id: `${c.id}${l.id}`,
                name: l.name,
            });
        });
    });

    for await (const code of codeData) {
        console.log(`group-id : ${code.group_id}\t code-id: ${code.code_id}\t name: ${code.name}`);

        const [result] = await conn.query(
            `insert into codes (type, group_id, code_id, name, created_at) values ('${code.type}', '${code.group_id}', '${code.code_id}', '${code.name}', now());`,
        );
        if (!result) {
            console.debug('code insert error...');
            exit();
        }
    }
    console.debug(`:::::::::::::::::::::::::::::Codes End::::::::::::::::::::::::::::::`);

    console.debug(`:::::::::::::::::::::::::::::Regions Start::::::::::::::::::::::::::::::`);
    if (fs.existsSync('storage/regions.json')) {
        await conn.query(`truncate table regions;`);

        const regionsFile = fs.readFileSync('storage/regions.json', 'utf8');
        if (regionsFile.length > 0) {
            const regions = JSON.parse(regionsFile);
            for await (const region of regions) {
                const code_id = region.code_id;
                const code = region.code;
                const list = region.list;
                let count = 1;
                for await (const l of list) {
                    console.log(`code-id : ${code_id}\t code: ${code}${String(count).padStart(2, '0')}0\t name: ${l}`);
                    const [result] = await conn.query(
                        `insert into regions (code_id, code, name, created_at) values ('${code_id}', '${code}${String(count).padStart(
                            2,
                            '0',
                        )}0', '${l}', now());`,
                    );
                    if (!result) {
                        console.debug('regions insert error...');
                        exit();
                    }

                    count = count + 1;
                }
            }
        }
    }

    await conn.query(`SET FOREIGN_KEY_CHECKS=1;`);

    console.debug(`:::::::::::::::::::::::::::::Codes End::::::::::::::::::::::::::::::`);

    console.debug(`######################################################################`);
    exit();
})();
