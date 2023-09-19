declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_PRISMA_URL: string;
        DATABASE_URL_NON_POOLING: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_EXPIRY: string;
        REFRESH_TOKEN_EXPIRY: string;
        EMAIL_USERNAME: string;
        EMAIL_PASSWORD: string;
    }
}