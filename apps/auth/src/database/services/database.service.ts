import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly connection: DataSource) {}
  async getConnection() {
    return this.connection;
  }
}
