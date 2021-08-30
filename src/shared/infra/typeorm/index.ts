import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
  name: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "database_ignite";
  newOptions.name ="juan",
  createConnection({
    ...options,
  });
});
