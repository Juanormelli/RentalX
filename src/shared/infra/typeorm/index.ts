import { createConnection, getConnectionOptions } from "typeorm";



export default async (host="database") => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(Object.assign(defaultOptions,{
        host
      }
    )
  )



}