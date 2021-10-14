import { createConnection, getConnectionOptions } from "typeorm";



export default async () => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(Object.assign(defaultOptions,{
        host : process.env.NODE_ENV ==='test',
        database: process.env.NODE_ENV === 'test'? "rentx_test" : defaultOptions.database

      }
    )
  )



}