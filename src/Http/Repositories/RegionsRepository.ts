import { Regions } from '@Entity/Regions';
import AppDataSource from '@Database/AppDataSource';

const regionsRepository = AppDataSource.getRepository(Regions);

const RegionsRepository = {
    findAll: async (): Promise<Array<Regions>> => {
        return await regionsRepository.find({
            select: [`code_id`, `code`, `name`],
            order: {
                id: 'asc',
            },
            relations: ['r_code_id'],
        });
    },
};

export default RegionsRepository;
