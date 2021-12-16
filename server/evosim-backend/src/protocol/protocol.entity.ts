import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProtocolEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tick: number;

  @Column()
  creatureId: string;

  @Column()
  population: number;

  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @Column()
  energy: number;

  @Column()
  direction: number;

  @Column()
  ticksAlive: number;

  @Column()
  tickBorn: number;

  @Column()
  algortithm: string;

  @Column()
  activation: string;

  @Column()
  generation: number;
}
