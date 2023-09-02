import pino from 'pino';
import pretty from 'pino-pretty';

import LogRepository from "@repository/log.repo";


const environment = new Map<string, string>(Object.entries({
    test: "silent",
    development: "debug",
    preview: "info",
    production: "error"
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

interface LoggerArgs {
    name: string;
    class?: string;
    module?: string;
    function?: string;
}

export const getDatabaseLogger = (args: LoggerArgs) => {
    const logRepo = new LogRepository();
    const childLogger = logger.child(args);

    return {
        debug: async (obj: object, message?: string, save?: boolean, ...args: any[]) => {
            childLogger.debug(obj, message, ...args);
            if (save) await logRepo.create({level: "debug", message: message || JSON.stringify(obj)});
        },
        info: async (obj: unknown, message?: string, save?: boolean, ...args: any[]) => {
            childLogger.info(obj, message, ...args);
            if (save) await logRepo.create({level: "info", message: message || JSON.stringify(obj)});
        },
        error: async (obj: unknown, message?: string, save?: boolean, ...args: any[]) => {
            childLogger.error(obj, message, ...args);
            if (save) await logRepo.create({level: "error", message: message || JSON.stringify(obj)});
        },
        warn: async (obj: unknown, message?: string, save?: boolean, ...args: any[]) => {
            childLogger.warn(obj, message, ...args);
            if (save) await logRepo.create({level: "warn", message: message || JSON.stringify(obj)});
        },
        fatal: async (obj: unknown, message?: string, save?: boolean, ...args: any[]) => {
            childLogger.fatal(obj, message, ...args);
            if (save) await logRepo.create({level: "fatal", message: message || JSON.stringify(obj)});
        }
    };
}

export const getLogger = (args: LoggerArgs) => logger.child(args);

export default logger;
