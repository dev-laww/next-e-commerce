import { ERROR_CODE, STATUS, STATUS_CODE } from "@lib/constants";

type Response = {
    statusCode: STATUS_CODE,
    response: {
        status: STATUS,
        message: string,
        code?: ERROR_CODE,
        data?: any,
        errors?: any,
    }
}


const success = (message: string, data?: any): Response => {
    return {
        statusCode: STATUS_CODE.SUCCESS,
        response: {
            status: STATUS.SUCCESS,
            message,
            data
        }
    }
}

const created = (message: string, data?: any): Response => {
    return {
        statusCode: STATUS_CODE.CREATED,
        response: {
            status: STATUS.SUCCESS,
            message,
            data
        }
    }
}

const badRequest = (message: string, errors?: any): Response => {
    return {
        statusCode: STATUS_CODE.BAD_REQUEST,
        response: {
            code: ERROR_CODE.BAD_REQUEST,
            status: STATUS.FAILED,
            message,
            errors
        }
    }
}

const unauthorized = (message: string): Response => {
    return {
        statusCode: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.UNAUTHORIZED,
            status: STATUS.FAILED,
            message
        }
    }
}

const notFound = (message: string): Response => {
    return {
        statusCode: STATUS_CODE.NOT_FOUND,
        response: {
            code: ERROR_CODE.NOT_FOUND,
            status: STATUS.FAILED,
            message
        }
    }
}

const internalServerError = (message: string): Response => {
    return {
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        response: {
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            status: STATUS.FAILED,
            message
        }
    }
}

const validationError = (message: string, errors: any): Response => {
    return {
        statusCode: STATUS_CODE.BAD_REQUEST,
        response: {
            code: ERROR_CODE.VALIDATION_ERROR,
            status: STATUS.FAILED,
            message,
            errors
        }
    }
}

const invalidCredentials = (message: string): Response => {
    return {
        statusCode: STATUS_CODE.BAD_REQUEST,
        response: {
            code: ERROR_CODE.INVALID_CREDENTIALS,
            status: STATUS.FAILED,
            message
        }
    }
}

const error = (statusCode: STATUS_CODE, message: string, error?: ERROR_CODE): Response => {
    return {
        statusCode: statusCode,
        response: {
            status: STATUS.FAILED,
            message: message,
            code: error
        }
    }
}

const Response = {
    success,
    created,
    badRequest,
    unauthorized,
    notFound,
    internalServerError,
    validationError,
    invalidCredentials,
    error
}

export default Response;