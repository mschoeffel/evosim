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
    for (const figure of board.figures()) {
      const protocol = new ProtocolEntity();
      protocol.tick = board.gamestate.currentTick;
      protocol.run = board.gamestate.run;
      protocol.figureId = figure.id;
      protocol.population = figure.population;
      protocol.positionX = figure.positionX;
      protocol.positionY = figure.positionY;
      protocol.energy = figure.energy;
      protocol.direction = figure.direction;
      protocol.ticksAlive = figure.ticksAlive;
      protocol.tickBorn = figure.initTick;
      protocol.algortithm = figure.algorithm;
      protocol.activation = figure.activation;
      protocol.generation = figure.generation;
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
