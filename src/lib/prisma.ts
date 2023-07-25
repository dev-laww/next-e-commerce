import { PrismaClient } from "@prisma/client";


const prisma = process.env.NODE_ENV === 'production' ? new PrismaClient({
    log: [{
        level: 'query',
        emit: 'event'
    }, {
        level: 'info',
        emit: 'event'
    }, {
        level: 'warn',
        emit: 'stdout'
    }, {
        level: 'error',
        emit: 'event'
    }],

}) : new PrismaClient({
    log: ['info', 'warn', 'error'],
    datasources: {
        db: {
            url: process.env.PROD_DATABASE_URL,
        }
    }
});

export default prisma;