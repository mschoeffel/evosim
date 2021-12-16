import { ProtocolEntity } from './protocol.entity';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolService } from './protocol.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ProtocolEntity])],
  providers: [ProtocolService],
  exports: [ProtocolService],
})
export class ProtocolModule {}
