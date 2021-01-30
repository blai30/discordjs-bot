import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ReactionRole {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false })
  public guild_id: string;

  @Column({ nullable: false })
  public message_id: string;

  @Column({ nullable: false })
  public role_id: string;

  @Column({ nullable: false })
  public emoji: string;

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
