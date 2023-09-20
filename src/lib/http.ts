import { ZodIssue } from "zod";

import { ERROR_CODE, STATUS, STATUS_CODE } from "@lib/constants";
import { Response } from "@lib/types";
import { NextRequest } from "next/server";
import { verifyAccessToken } from "@utils/token";

namespace Response {
    export const ok = (message?: string, data?: any): Response => ({

        statusCode: STATUS_CODE.OK,
        response: {
            status: STATUS.SUCCESS,
            message: message || "Success",
            data
        }
    })

    export const created = (message?: string, data?: any): Response => ({
        statusCode: STATUS_CODE.CREATED,
        response: {
            status: STATUS.SUCCESS,
            message: message || "Created",
            data
        }

    })

    export const badRequest = (message?: string, errors?: any): Response => ({
        statusCode: STATUS_CODE.BAD_REQUEST,
        response: {
            code: ERROR_CODE.BAD_REQUEST,
            status: STATUS.FAILED,
            message: message || "Bad request",
            errors
        }
    })


    export const unauthorized = (message?: string): Response => ({
        statusCode: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.UNAUTHORIZED,
            status: STATUS.FAILED,
            message: message || "Unauthorized"
        }
    })

    export const notFound = (message?: string): Response => ({
        statusCode: STATUS_CODE.NOT_FOUND,
        response: {
            code: ERROR_CODE.NOT_FOUND,
            status: STATUS.FAILED,
            message: message || "Not found"
        }
    })


    export const internalServerError = (message?: string): Response => ({
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        response: {
            code: ERROR_CODE.INTERNAL_SERVER_ERROR,
            status: STATUS.FAILED,
            message: message || "Unknown error"
        }
    })


    export const validationError = (errors: ZodIssue[], message?: string,): Response => {
        const errorMessages = errors.map(error => error.message).join(", ");
        return {
            statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
            response: {
                code: ERROR_CODE.VALIDATION_ERROR,
                status: STATUS.FAILED,
                message: message || "Validation error",
                errors: errorMessages,
            }
        }
    }

    export const invalidCredentials = (message?: string): Response => ({
        statusCode: STATUS_CODE.UNAUTHORIZED,
        response: {
            code: ERROR_CODE.INVALID_CREDENTIALS,
            status: STATUS.FAILED,
            message: message || "Invalid credentials"
        }
    })


    export const error = (statusCode: STATUS_CODE, message: string, error?: ERROR_CODE): Response => ({
        statusCode: statusCode,
        response: {
            status: STATUS.FAILED,
            message: message,
            code: error
        }
    })


    export const methodNotAllowed: Response = {
        statusCode: STATUS_CODE.METHOD_NOT_ALLOWED,
        response: {
            code: ERROR_CODE.METHOD_NOT_ALLOWED,
            status: STATUS.FAILED,
            message: "Method not allowed"
        }
    }

    export const forbidden: Response = {
        statusCode: STATUS_CODE.FORBIDDEN,
        response: {
            code: ERROR_CODE.FORBIDDEN,
            status: STATUS.FAILED,
            message: "User is not allowed to perform this action"
        }
    }
}

export const getSession = async (req: NextRequest) => {
    const token = req.headers.get("Authorization")!.split(" ")[1];

    return (await verifyAccessToken(token))!;
}

export default Response;