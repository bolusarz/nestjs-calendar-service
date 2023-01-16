import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { Task } from "./task.model";
import ObjectID from "bson-objectid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { getDate, getMonth, getYear, startOfWeek } from "date-fns";

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
    task: Partial<CreateTaskDto> & { id?: string }
  ): Promise<Task> {
    const id = ObjectID(task.id || "");
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

  getTasksByWeek(date: string): Promise<Task[]> {
    const dateObj = new Date(date);
    const startDateOfWeek = startOfWeek(dateObj);
    const month = getMonth(startDateOfWeek) + 1;
    const year = getYear(startDateOfWeek);
    const day = getDate(dateObj);
    return this.tasksRepository.find({
      where: {
        $and: [
          {
            year: year,
            month: month,
            day: { $lte: day + 6, $gte: day },
          },
        ],
      },
    });
  }

  getTasksByRange(startDate: string, endDate: string): Promise<Task[]> {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const startYear = getYear(startDateObj);
    const startMonth = getMonth(startDateObj) + 1;
    const startDay = getDate(startDateObj);

    const endYear = getYear(endDateObj);
    const endMonth = getMonth(endDateObj) + 1;
    const endDay = getDate(endDateObj);

    return this.tasksRepository.find({
      where: {
        $and: [
          {
            year: { $lte: endYear, $gte: startYear },
            month: { $lte: endMonth, $gte: startMonth },
            day: { $lte: endDay, $gte: startDay },
          },
        ],
      },
    });
  }
}
