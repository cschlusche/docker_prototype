import { log } from './deps.ts'

export const logFileHandler = new log.handlers.FileHandler("DEBUG", {
    filename: "./logs/log.txt",
    formatter: "{datetime} {levelName} {msg}"
})

await log.setup({
    handlers: {
        allOnConsole: new log.handlers.ConsoleHandler("DEBUG"),
        allOnFile: logFileHandler
    },

    loggers: {
        debug: {
            level: "DEBUG",
            handlers: ['allOnConsole', 'allOnFile']
        }
    }
})

export const logger = log.getLogger('debug');