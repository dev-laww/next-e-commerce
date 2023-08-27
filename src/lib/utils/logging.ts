import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';

const environment = new Map<string, string>(Object.entries({
    "local": "debug",
    "development": "info",
    "stage": "error",
    "production": "error"
}))

const stream = pretty({
    colorize: true,
    ignore: "hostname,pid",
    translateTime: "SYS:standard"
})

export function getLogger(name: string): Logger {
    return pino({
        name,
        level: environment.get(process.env.NODE_ENV)!
    },
    stream,
    )
}