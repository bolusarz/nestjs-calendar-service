import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Task } from "./task.model";
import { TasksService } from "./tasks.service";
import { TaskByDateParam, TaskByYearAndMonthParam, TaskByYearParam } from "./dto/filter-task.param";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(":year")
  getTaskByYear(@Param() { year }: TaskByYearParam): Promise<Task[]> {
    return this.taskService.filterTask(year);
  }

  @Get(":year/:month")
  getTaskByYearAndMonth(
    @Param() { year, month }: TaskByYearAndMonthParam
  ): Promise<Task[]> {
    return this.taskService.filterTask(year, month);
  }

  @Get(":year/:month/:day")
  getTaskByDate(
    @Param() { year, month, day }: TaskByDateParam
  ): Promise<Task[]> {
    return this.taskService.filterTask(year, month, day);
  }

  @Post()
  createTask(@Body() taskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(taskDto);
  }

  @Patch(":id")
  updateTask(
    @Body() taskDto: Partial<CreateTaskDto>,
    @Param("id") id: string
  ): Promise<Task> {
    return this.taskService.updateTask({ ...taskDto, id });
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
