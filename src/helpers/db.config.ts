import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const dbConfig: TypeOrmModuleOptions = {
  type: "mongodb",
  host: "localhost",
  port: 27017,
  username: "root",
  password: "",
  database: "calendar",
  autoLoadEntities: true,
  synchronize: true,
};
