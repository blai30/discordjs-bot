import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * );
 */

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text')
  public description: string;

  @Column()
  public name: string;

  @Column()
  public usage_count: number;

  @Column()
  public username: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
