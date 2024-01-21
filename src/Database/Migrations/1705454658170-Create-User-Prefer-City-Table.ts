import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

const tableName = `user_prefer_city`;

export class CreateUserPreferCityTable1705454658170 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'city',
                        type: 'char',
                        length: '6',
                        isNullable: true,
                    },
                    {
                        name: 'town',
                        type: 'char',
                        length: '6',
                        isNullable: true,
                    },
                    {
                        name: 'state',
                        type: 'enum',
                        enum: [`Y`, `N`],
                        isNullable: false,
                        default: `'N'`,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['city'],
                referencedTableName: 'regions',
                referencedColumnNames: ['code_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['town'],
                referencedTableName: 'regions',
                referencedColumnNames: ['code'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            tableName,
            new TableIndex({
                name: 'IDX_USER_PREFER_CITY',
                columnNames: ['user_id', 'city', 'town'],
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        if (table) {
            await queryRunner.dropTable(tableName);
        }
    }
}
