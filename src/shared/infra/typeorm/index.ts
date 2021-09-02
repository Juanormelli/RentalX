import { createConnection, getConnectionOptions } from "typeorm";



export default async (host="database_ignite") => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(Object.assign(defaultOptions,{
        host
      }
    )
  )



}