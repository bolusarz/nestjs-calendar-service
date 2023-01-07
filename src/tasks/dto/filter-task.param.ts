import { IsNumberString, Max, Min } from "class-validator";

export class TaskByDateParam {
  @IsNumberString()
  @Min(1970)
  @Max(3000)
  year: number;

  @IsNumberString()
  @Min(1)
  @Max(12)
  month: number;

  @IsNumberString()
  @Min(1)
  @Max(31)
  day: number;
}

export class TaskByYearAndMonthParam {
  @IsNumberString()
  @Min(1970)
  @Max(3000)
  year: number;

  @IsNumberString()
  @Min(1)
  @Max(12)
  month: number;
}

export class TaskByYearParam {
  @IsNumberString()
  @Min(1970)
  @Max(3000)
  year: number;
}
