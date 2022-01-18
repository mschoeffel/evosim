import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerationDumpEntity } from './generation-dump.entity';
import { GenerationDumpService } from './generation-dump.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GenerationDumpEntity])],
  providers: [GenerationDumpService],
  exports: [GenerationDumpService],
})
export class GenerationDumpModule {}
