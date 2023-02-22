import { Application, oakCors, Client } from './deps.ts'
import { r } from './routes.ts'

const APP_HOST = 'deno' //127.0.0.1 -> {docker-compose.yml service_name}
const APP_PORT = 8080

const app = new Application();
app.use(oakCors({origin: /^.+127.0.0.1$/,
optionSuccessStatus: 200}))

app.use(r.routes())

let db_connection_config = {
    
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
    let conn = await db_client.connect();

}catch(error){
    console.error(`An error occured accessing the database. More information below: `)
    console.error(`${JSON.stringify(error.message)}`)
    console.error(`${JSON.stringify(error.fields)}`)
    console.error(`${JSON.stringify(error.stack)}`)
    console.error(`Credentials: ${JSON.stringify(db_connection_config)}`)
    //Deno.exit();

}

try{
    const res = await db_client.queryArray('CREATE TABLE IF NOT EXISTS products (id integer PRIMARY KEY)')
}catch(error){
    console.error(`${JSON.stringify(error.message)}`)
    console.error(`${JSON.stringify(error.fields)}`)
    console.error(`${JSON.stringify(error.stack)}`)
}




/* const db_connector = new PostgresConnector({
    host: '0.0.0.0',
    port: 5432,
    username: 'postgres',               // TODO: [production] change to lower privileged user
    password: 'secret',                 // TODO: [production] use password file
    database: 'prototype',
    debug: true                         // TODO: [production] turn off debug mode
})

const db = new Database(db_connector);

class Client_Persist extends Model {
    static table = 'clients'
    
    static fields = {
        id: { primaryKey: true, autoIncrement: true },
        firstname: DataTypes.string(64),
        lastname: DataTypes.string(64),
        lastUpdate: DataTypes.Timestamp,
        lastStatus: DataTypes.Boolean
    }
}

db.link([Client_Persist])

await db.sync({drop: true});

await Client_Persist.create({firstname:'Christian', lastname:'Schlusche', lastUpdate: 1676369568, lastStatus: true}) */

try{
    console.info(`Denon monitored CORS-enabled deno listening on ${APP_HOST}:${APP_PORT}`)
    await app.listen({ hostname: APP_HOST, port: APP_PORT });
}catch(error){
    console.error(`Deno error: ${JSON.stringify(error)}`)
}finally{
    
    // clean up
    // TODO: create finally block
    await db_client.end();
}