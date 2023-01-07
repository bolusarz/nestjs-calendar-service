import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Task } from "./task.model";
import ObjectID from "bson-objectid";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: MongoRepository<Task>
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  createTask(task: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.save({ ...task });
  }

  async updateTask(
    task: Partial<CreateTaskDto> & { id: string }
  ): Promise<Task> {
    const id = ObjectID(task.id);
    // @ts-ignore
    delete task.id;
    const res = await this.tasksRepository.findOneAndUpdate(
      { _id: id },
      { $set: { ...task } },
      { returnOriginal: false }
    );
    return res.value;
  }

  async deleteTask(id: string): Promise<Task> {
    const res = await this.tasksRepository.findOneAndDelete({
      _id: ObjectID(id),
    });
    return res.value;
  }

  filterTask(
    year: number,
    month: number | undefined = undefined,
    day: number | undefined = undefined
  ): Promise<Task[]> {
    const conditions: Array<any> = [{ year: Number(year) }];

    if (month) conditions.push({ month: Number(month) });
    if (day) conditions.push({ day: Number(day) });

    return this.tasksRepository.find({
      where: {
        $and: conditions,
      },
    });
  }
}
