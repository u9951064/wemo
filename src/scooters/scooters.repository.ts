import { Scooter } from './entities/scooter.entity';
import { Brackets, EntityRepository, ObjectLiteral, Repository } from 'typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ScootersPaginationDto } from './dto/scooter-pagination.dto';

@EntityRepository(Scooter)
export class ScootersRepository extends Repository<Scooter> {
  /**
   * 寫入一筆新的車輛資料
   * @param createScooterDto
   * @returns
   */
  async createScooter(createScooterDto: CreateScooterDto): Promise<Scooter> {
    const scooter = this.create(createScooterDto);

    try {
      await scooter.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return scooter;
  }

  /**
   * 依照指定條件查詢資料
   * @param page 頁數
   * @param limit 每頁數量
   * @param conditions 搜尋條件
   * @returns
   */
  async searchScooter(
    page = 1,
    limit = 15,
    conditions:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
  ): Promise<ScootersPaginationDto> {
    const skip = page <= 1 ? 0 : (page - 1) * limit;
    const builder = this.createQueryBuilder();

    builder.where(conditions);

    const totalRecords = await builder.getCount();
    const records = await builder
      .skip(skip)
      .take(limit)
      .orderBy('created_at', 'DESC')
      .getMany();

    const lastPage = Math.max(1, Math.ceil(totalRecords / limit));

    return {
      from: skip <= totalRecords ? skip + 1 : null,
      to: Math.min(skip + limit, totalRecords),
      per_page: limit,
      total: totalRecords,
      current_page: page,
      prev_page: page > 1 ? page - 1 : null,
      next_page: lastPage > page ? page + 1 : null,
      last_page: lastPage,
      records,
    };
  }
}
