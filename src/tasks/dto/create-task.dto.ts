import { IsInt, Max, Min, MinLength } from "class-validator";

export class CreateTaskDto {
  @MinLength(5)
  title: string;
  description: string;

  @Min(1)
  @Max(31)
  @IsInt()
  day: number;

  @Min(1)
  @Max(12)
  @IsInt()
  month: number;

  @Min(1970)
  @Max(3000)
  @IsInt()
  year: number;

  @Min(0)
  @Max(1440)
  time: number;
}
