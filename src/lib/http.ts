import { ZodIssue } from "zod";

import { ERROR_CODE, STATUS, STATUS_CODE } from "@lib/constants";
import { Response } from "@lib/types";

const ok = (message: string, data?: any): Response => ({
    statusCode: STATUS_CODE.OK,
    response: {
        status: STATUS.SUCCESS,
        message,
        data
    }
})

const created = (message: string, data?: any): Response => ({
    statusCode: STATUS_CODE.CREATED,
    response: {
        status: STATUS.SUCCESS,
        message,
        data
    }

})

const badRequest = (message: string, errors?: any): Response => ({
    statusCode: STATUS_CODE.BAD_REQUEST,
    response: {
        code: ERROR_CODE.BAD_REQUEST,
        status: STATUS.FAILED,
        message,
        errors
    }
})


const unauthorized = (message?: string): Response => ({
    statusCode: STATUS_CODE.UNAUTHORIZED,
    response: {
        code: ERROR_CODE.UNAUTHORIZED,
        status: STATUS.FAILED,
        message: message || "Unauthorized"
    }
})

const notFound = (message: string): Response =>  ({
    statusCode: STATUS_CODE.NOT_FOUND,
    response: {
        code: ERROR_CODE.NOT_FOUND,
        status: STATUS.FAILED,
        message
    }
})


const internalServerError = (message: string): Response => ({
    statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
    response: {
        code: ERROR_CODE.INTERNAL_SERVER_ERROR,
        status: STATUS.FAILED,
        message
    }
})


const validationError = (message: string, errors: ZodIssue[]): Response => {
    const errorMessages = errors.map(error => error.message).join(", ");
    return {
        statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
        response: {
            code: ERROR_CODE.VALIDATION_ERROR,
            status: STATUS.FAILED,
            errors: errorMessages,
            message,
        }
    }
}

const invalidCredentials = (message: string): Response => ({
    statusCode: STATUS_CODE.UNAUTHORIZED,
    response: {
        code: ERROR_CODE.INVALID_CREDENTIALS,
        status: STATUS.FAILED,
        message
    }
})


const error = (statusCode: STATUS_CODE, message: string, error?: ERROR_CODE): Response => ({
    statusCode: statusCode,
    response: {
        status: STATUS.FAILED,
        message: message,
        code: error
    }
})


const methodNotAllowed: Response = {
    statusCode: STATUS_CODE.METHOD_NOT_ALLOWED,
    response: {
        code: ERROR_CODE.METHOD_NOT_ALLOWED,
        status: STATUS.FAILED,
        message: "Method not allowed"
    }
}

const forbidden: Response = {
    statusCode: STATUS_CODE.FORBIDDEN,
    response: {
        code: ERROR_CODE.FORBIDDEN,
        status: STATUS.FAILED,
        message: "User is not allowed to perform this action"
    }
}

const Response = {
    ok,
    created,
    badRequest,
    unauthorized,
    notFound,
    internalServerError,
    validationError,
    invalidCredentials,
    error,
    methodNotAllowed,
    forbidden
}

export default Response;