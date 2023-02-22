import { Application, oakCors } from './deps.ts'
import { r } from './routes.ts'


const APP_HOST = '0.0.0.0'
const APP_PORT = 8080

const app = new Application();
app.use(oakCors({origin: /^.+127.0.0.1$/,
                 optionSuccessStatus: 200}))

app.use(r.routes())

console.info(`Denon monitored CORS-enabled deno listening on ${APP_HOST}:${APP_PORT}`)
await app.listen({ hostname: APP_HOST, port: APP_PORT });