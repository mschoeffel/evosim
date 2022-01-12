import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProtocolEntity } from './protocol.entity';
import { BoardEntity } from '../board/board.entity';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(ProtocolEntity)
    private protocolEntityRepository: Repository<ProtocolEntity>,
  ) {}

  create(protocol: ProtocolEntity): Promise<ProtocolEntity> {
    return this.protocolEntityRepository.save(protocol);
  }

  createProtocol(board: BoardEntity): void {
    for (const blob of board.blobs()) {
      const protocol = new ProtocolEntity();
      protocol.tick = board.gamestate.currentTick;
      protocol.creatureId = blob.id;
      protocol.population = blob.population;
      protocol.positionX = blob.positionX;
      protocol.positionY = blob.positionY;
      protocol.energy = blob.energy;
      protocol.direction = blob.direction;
      protocol.ticksAlive = blob.ticksAlive;
      protocol.tickBorn = blob.initTick;
      protocol.algortithm = blob.algorithm;
      protocol.activation = blob.activation;
      protocol.generation = blob.generation;
      this.create(protocol);
    }
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
