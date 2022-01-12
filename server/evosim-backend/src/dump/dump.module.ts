import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DumpEntity } from './dump.entity';
import { DumpService } from './dump.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([DumpEntity])],
  providers: [DumpService],
  exports: [DumpService],
})
export class DumpModule {}
