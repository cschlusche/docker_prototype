import { Application, oakCors, ClientOptions, Client } from './deps.ts'
import { r } from './routes.ts'
import { logFileHandler, logger } from './log.ts'

const APP_HOST = 'deno' //127.0.0.1 -> {docker-compose.yml service_name}
const APP_PORT = 8080

const app = new Application();
app.use(oakCors({origin: /^.+127.0.0.1$/,
optionsSuccessStatus: 200}))

app.use(r.routes())

const db_connection_config: ClientOptions = {
    
    applicationName: "prototype_app",
    connection: {
        attempts: 1,
    },
    database: "prototype",
    hostname: "postgres", // 127.0.0.1 -> {docker-compose.yml service_name}
    host_type: "tcp",
    password: "secret",
    /* options: {
        "max_index_keys": "32",
    }, */
    port: 5432,
    user: "postgres",
    tls: {
        enforce: false,
    },
}

let db_client : Client;

try{
    db_client = new Client( db_connection_config );
    const conn = await db_client.connect();

}catch(error){
    logger.error(`An error occured accessing the database. More information below: `)
    logger.error(`${JSON.stringify(error.message)}`)
    logger.error(`${JSON.stringify(error.fields)}`)
    logger.error(`${JSON.stringify(error.stack)}`)
    logger.error(`Credentials: ${JSON.stringify(db_connection_config)}`)
    Deno.exit();

}

try{
    const res = await db_client.queryArray('CREATE TABLE IF NOT EXISTS products (id integer PRIMARY KEY)')
}catch(error){
    logger.error(`${JSON.stringify(error.message)}`)
    logger.error(`${JSON.stringify(error.fields)}`)
    logger.error(`${JSON.stringify(error.stack)}`)
}


try{
    logger.info(`Denon monitored CORS-enabled deno listening on ${APP_HOST}:${APP_PORT}`)
    await app.listen({ hostname: APP_HOST, port: APP_PORT });
}catch(error){
    logger.error(`Deno error: ${JSON.stringify(error)}`)
}finally{
    
    // clean up
    await db_client.end();
    /** @link https://stackoverflow.com/questions/62181019/how-to-log-to-a-file-with-deno */
    await logFileHandler.flush();
}