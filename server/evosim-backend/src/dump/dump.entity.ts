import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DumpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tick: number;

  @Column()
  population: number;

  @Column()
  avgLifetime: number;

  @Column()
  avgGeneration: number;

  @Column()
  avgEnergy: number;

  @Column()
  maxEnergy: number;

  @Column()
  maxLifetime: number;
}
