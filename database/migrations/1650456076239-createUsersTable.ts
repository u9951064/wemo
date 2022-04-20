import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1650456076239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '20',
            isNullable: false,
            comment: '使用者名稱',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '128',
            isNullable: false,
            comment: '使用者密碼',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
            comment: '建立時間',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: false,
            comment: '更新時間',
          },
        ],
        indices: [
          {
            name: 'user_auth_index',
            columnNames: ['username'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
