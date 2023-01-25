import {Entity, Column, PrimaryColumn, BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    name: 'full_name',
  })
  fullName: string;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
  })
  role: string;

  @Column({
    nullable: false,
  })
  photo: string;

  @Column({
    nullable: true,
  })
  telegram: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  twitter: string;

  @Column({
    nullable: true,
  })
  linkedin: string;

  @Column({
    nullable: true,
  })
  github: string;
}
