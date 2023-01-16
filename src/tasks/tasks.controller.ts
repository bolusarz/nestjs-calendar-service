import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { Task } from "./task.model";
import { TasksService } from "./tasks.service";
import { TaskByDateParam, TaskByYearAndMonthParam, TaskByYearParam } from "./dto/filter-task.param";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Tasks")
@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}
  @ApiOperation({ summary: "Fetch all tasks" })
  @ApiResponse({
    status: 200,
    type: Array<Task>,
    description: "All tasks",
  })
  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get("week/:date")
  getTaskByWeek(@Param("date") date: string): Promise<Task[]> {
    return this.taskService.getTasksByWeek(date);
  }

  @Get("range/:range")
  getTaskByRange(@Param("range") range: string): Promise<Task[]> {
    if (!range.includes("-"))
      throw new HttpException(
        "Range must follow format 'startDate-endDate'",
        HttpStatus.BAD_REQUEST
      );
    const [startDate, endDate] = range.split("-");
    return this.taskService.getTasksByRange(startDate.trim(), endDate.trim());
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

  @ApiOperation({ summary: "Create tasks" })
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
