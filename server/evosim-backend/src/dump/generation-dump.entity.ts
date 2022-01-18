import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GenerationDumpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tick: number;

  @Column()
  population: number;

  @Column()
  avgLifetime: number;

  @Column()
  generation: number;

  @Column()
  avgEnergy: number;

  @Column()
  maxEnergy: number;

  @Column()
  maxLifetime: number;
}
