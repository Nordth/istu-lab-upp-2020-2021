import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Credentials } from './credentials'

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: Credentials.host,
    username: Credentials.username,
    password: Credentials.password,
    database: Credentials.database,
    entities: [__dirname + '/./**/*.entity.{js,ts}'],
    synchronize: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
}