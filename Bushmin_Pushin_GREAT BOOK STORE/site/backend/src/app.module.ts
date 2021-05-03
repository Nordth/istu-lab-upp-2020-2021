import { Module } from '@nestjs/common'
import { TypeOrmConfig } from './typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModule } from './database/Product/product.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
