import { Scooter } from '../entities/scooter.entity';

export interface ScootersPagination {
  from?: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page?: number;
  next_page?: number;
  last_page: number;
  records: Scooter[];
}
