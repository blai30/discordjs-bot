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

  @Column()
  public name: string;

  @Column('text')
  public description: string;

  @Column()
  public user_id: string;

  @Column({ default: 0 })
  public usage_count: number;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
