import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createScootersTable1650252852100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scooters',
        columns: [
          {
            name: 'plate_number',
            type: 'varchar',
            length: '8',
            isNullable: false,
            isPrimary: true,
            comment: '車牌號碼',
          },
          {
            name: 'mileage',
            type: 'int',
            default: 0,
            isNullable: false,
            unsigned: true,
            comment: '里程數',
          },
          {
            name: 'gps_position',
            type: 'varchar',
            length: '20',
            isNullable: false,
            comment: 'GPS座標',
          },
          {
            name: 'status',
            type: 'int',
            default: 1,
            isNullable: false,
            comment: '狀態 (1:等待中, 2:出借中, -1:故障, -2:報廢, -3:錯誤)',
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
            name: 'scooter_mileage_index',
            columnNames: ['mileage'],
          },
          {
            name: 'scooter_status_index',
            columnNames: ['status'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('scooters', true);
  }
}
