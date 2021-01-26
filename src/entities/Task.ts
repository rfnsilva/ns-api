import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("task")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { nullable: false })
  description: string;
}
