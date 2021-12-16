import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProtocolEntity } from './protocol.entity';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolEntity)
    private protocolEntityRepository: Repository<ProtocolEntity>,
  ) {}

  create(protocol: ProtocolEntity): Promise<ProtocolEntity> {
    return this.protocolEntityRepository.save(protocol);
  }

  findAll(): Promise<ProtocolEntity[]> {
    return this.protocolEntityRepository.find();
  }

  findOne(id: string): Promise<ProtocolEntity> {
    return this.protocolEntityRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.protocolEntityRepository.delete(id);
  }
}
