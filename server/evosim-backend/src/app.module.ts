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
import { SnapshotModule } from './snapshot/snapshot.module';
import { GenerationDumpEntity } from './dump/generation-dump.entity';
import { GenerationDumpModule } from './dump/generation-dump.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SocketModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PSSW,
      database: 'EVOSIM',
      entities: [ProtocolEntity, DumpEntity, GenerationDumpEntity],
      synchronize: true,
    }),
    ProtocolModule,
    DumpModule,
    GenerationDumpModule,
    SnapshotModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
