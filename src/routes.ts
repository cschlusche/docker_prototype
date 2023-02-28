import { Router, Status, csv } from './deps.ts'
import { logFileHandler, logger } from './log.ts'

export const r = new Router();

r.get('/', async(ctx) => {

    logger.info(`${ctx.request.method} ${ctx.request.url}`);

    ctx.response.status = 200
    ctx.response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
    ctx.response.type = 'application/json'
    ctx.response.body = JSON.stringify( '{"message": "welcome"}' )

    await logFileHandler.flush();
})

r.get('/read', async (ctx) => {
    
    /*
    * Read csv-file
    */
    let clientData: string[] = [];
    try{     
        
        const fileContents = await Deno.readTextFile('./demodata/clients.csv')
        const rows = await csv.parse(fileContents, {
            skipFirstRow: true,
            columns: ['id','firstname','lastname','lastUpdate','lastStatus']
        })
        
        clientData = rows.flat(1) as string[];
        
    }catch(error){
        logger.error("Error route '/read'" + JSON.stringify(error, null, 2))
    }
    
    ctx.response.status = 200
    ctx.response.headers.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080')
    ctx.response.type = 'json'
    ctx.response.body = JSON.stringify( clientData )

    await logFileHandler.flush();
})

export default r