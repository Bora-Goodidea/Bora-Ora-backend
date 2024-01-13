import { Codes } from '@Entity/Codes';
import AppDataSource from '@Database/AppDataSource';

const codeRepository = AppDataSource.getRepository(Codes);

const CodeRepository = {
    /**
     * 조회
     */
    findAll: async (): Promise<Array<Codes>> => {
        return await codeRepository.find({
            select: ['type', 'group_id', 'code_id', 'name'],
            order: {
                id: 'asc',
            },
        });
    },
};

export default CodeRepository;
