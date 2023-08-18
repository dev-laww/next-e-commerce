export enum STATUS_CODE {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    METHOD_NOT_ALLOWED = 405,
}

export enum STATUS {
    SUCCESS = 'success',
    FAILED = 'failed',
}

export enum ERROR_CODE {
    UNAUTHORIZED = 'UNAUTHORIZED',
    NOT_FOUND = 'NOT_FOUND',
    UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
    METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST = 'BAD_REQUEST',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}


export enum TOKEN_TYPE {
    EMAIL_CONFIRMATION_TOKEN = 'EMAIL_CONFIRMATION_TOKEN',
    PASSWORD_RESET_TOKEN = 'PASSWORD_RESET_TOKEN',
    EMAIL_CONFIRMATION_OTP = 'EMAIL_CONFIRMATION_OTP',
    PASSWORD_RESET_OTP = 'PASSWORD_RESET_OTP',
}

export const TOKEN_OTP_EXPIRY = 60 * 60 * 1000; // 1 hour