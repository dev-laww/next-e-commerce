import pino from 'pino';
import pretty from 'pino-pretty';

import LogRepository from "@repository/log.repo";


const environment = new Map<string, string>(Object.entries({
    "development": "debug",
    "preview": "info",
    "production": "error"
}))

const stream = pretty({
    colorize: true,
    ignore: "hostname,pid",
    translateTime: "SYS:standard"
})

const logger = pino({
    name: "App Logger",
    level: environment.get(process.env.NODE_ENV ?? "development"),
}, stream);

export const getLogger = (name: string) => {
    const logRepo = new LogRepository();
    const childLogger = logger.child({name: name});

    return {
        debug: async (message: string, save?: boolean) => {
            childLogger.debug(message);
            if (save) await logRepo.create({level: "debug", message: message});
        },
        info: async (message: string, save?: boolean) => {
            childLogger.info(message);
            if (save) await logRepo.create({level: "info", message: message});
        },
        error: async (message: string, save?: boolean) => {
            childLogger.error(message);
            if (save) await logRepo.create({level: "error", message: message});
        },
        warn: async (message: string, save?: boolean) => {
            childLogger.warn(message);
            if (save) await logRepo.create({level: "warn", message: message});
        },
        fatal: async (message: string, save?: boolean) => {
            childLogger.fatal(message);
            if (save) await logRepo.create({level: "fatal", message: message});
        }
    };
}

export default logger;
