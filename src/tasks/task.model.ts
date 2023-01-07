import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Task {
  @ObjectIdColumn() _id: ObjectID;
  @Column() title: string;
  @Column() description: string;
  @Column() month: number;
  @Column() year: number;
  @Column() day: number;
  @Column() time: number;
}
