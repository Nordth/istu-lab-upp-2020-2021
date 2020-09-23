import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsRepository } from './items.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemsRepository]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService]
})
export class ItemsModule { }
