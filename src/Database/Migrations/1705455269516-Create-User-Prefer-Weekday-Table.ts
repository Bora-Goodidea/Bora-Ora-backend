import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

const tableName = `user_prefer_weekday`;

export class CreateUserPreferWeekdayTable1705455269516 implements MigrationInterface {
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
                        name: 'time',
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
                columnNames: ['time'],
                referencedTableName: 'codes',
                referencedColumnNames: ['code_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
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
