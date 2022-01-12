import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketModule } from './socket/socket.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolEntity } from './protocol/protocol.entity';
import { ProtocolModule } from './protocol/protocol.module';
import { DumpModule } from './dump/dump.module';
import { DumpEntity } from './dump/dump.entity';

@Module({
  imports: [
    SocketModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      // Local:
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      // Heroku:
      //url: process.env.DATABASE_URL,
      //type: 'postgres',
      //ssl: {
      //  rejectUnauthorized: false,
      //},
      database: 'EVOSIM',
      entities: [ProtocolEntity, DumpEntity],
      synchronize: true,
    }),
    ProtocolModule,
    DumpModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
