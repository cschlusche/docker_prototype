import { Router, Status, csv } from './deps.ts'

export const r = new Router();

r.get('/', async(ctx) => {

    console.log(`${ctx.request.method} ${ctx.request.url}`);

    ctx.response.status = 200
    ctx.response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
    ctx.response.type = 'application/json'
    ctx.response.body = JSON.stringify( '{"message": "welcome"}' )
})

export default r