import { Module } from '@nestjs/common'
import { TypeOrmConfig } from './typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './Users/users.module'
import { ItemsModule } from './Items/items.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    UsersModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
