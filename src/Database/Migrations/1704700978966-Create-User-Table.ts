import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

const tableName = `users`;

export class CreateUserTable1704700978966 implements MigrationInterface {
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
                        name: 'uid',
                        type: 'char',
                        length: '50',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'type',
                        type: 'char',
                        length: '6',
                        isNullable: true,
                    },
                    {
                        name: 'level',
                        type: 'char',
                        length: '6',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'gender',
                        type: 'char',
                        length: '6',
                        isNullable: true,
                    },
                    {
                        name: 'birthday',
                        type: 'char',
                        length: '8',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'char',
                        length: '6',
                        isNullable: true,
                    },
                    {
                        name: 'email_verified',
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
                columnNames: ['type'],
                referencedTableName: 'codes',
                referencedColumnNames: ['code_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['level'],
                referencedTableName: 'codes',
                referencedColumnNames: ['code_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['gender'],
                referencedTableName: 'codes',
                referencedColumnNames: ['code_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['status'],
                referencedTableName: 'codes',
                referencedColumnNames: ['code_id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_USERS_UID',
                columnNames: ['uid'],
                isUnique: true,
            }),
        );

        await queryRunner.createIndex(
            'users',
            new TableIndex({
                name: 'IDX_USERS_EMAIL',
                columnNames: ['email'],
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
