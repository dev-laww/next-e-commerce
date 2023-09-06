import { NextRequest } from "next/server";
import Response from "@lib/http";
import PermissionController from "@controller/permission.controller";
import { getDatabaseLogger } from "@utils/logging";

/**
 * Wrapper function to check if the user is permitted to access the resource
 *
 * @param target
 */
export function withPermission<T extends Function>(target: T): T {
    const wrapped = async function (this: typeof target, request: NextRequest, args: any[]) {
        const isAllowed = await PermissionController.isAllowed(request);

        if (isAllowed === "unauthorized") return Response.unauthorized();

        return isAllowed ? target.call(this, request, args) : Response.forbidden;
    }

    return wrapped as unknown as T;
}

/**
 * Class decorator to check if the user is permitted to access the resource
 *
 * @param target
 * @constructor
 */
export function AllowPermitted(target: Function): void;

/**
 * Method decorator to check if the user is permitted to access the resource
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */
export function AllowPermitted(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export function AllowPermitted(...args: any[]): any {
    if (args.length === 1 && typeof args[0] === 'function') {
        // Class decorator or wrapper function
        const target = args[0];
        // Get all property keys (method names) of the class prototype
        const keys = Object.getOwnPropertyNames(target.prototype);

        // Loop through each method of the class
        for (const key of keys) {
            // Store a reference to the original method
            const originalMethod = target.prototype[key];

            // Create a new method that wraps the original method with your middleware
            const newMethod = withPermission(originalMethod)

            // Replace the original method with the new wrapped method
            Object.defineProperty(target.prototype, key, {
                value: newMethod,
                configurable: true,
                writable: true,
            });
        }
    } else if (args.length === 3 && typeof args[2] === 'object' && typeof args[2].value === 'function') {
        const [_target, _propertyKey, descriptor] = args;
        const originalMethod = descriptor.value;

        descriptor.value = withPermission(originalMethod);
    } else {
        throw new Error('Invalid usage of AllowPermitted decorator');
    }
}

/**
 * Wrapper function to check if the request body is valid
 *
 * @param func
 * @param method
 */
export function checkMethod<T extends Function>(func: T, method: string | string[]): T {
    const wrapped = async function (this: typeof func, request: NextRequest, args: any[]) {
        if (Array.isArray(method) && !method.includes(request.method)) return Response.methodNotAllowed;

        if (typeof method === "string" && method !== request.method) return Response.methodNotAllowed;

        return func.call(this, request, args);
    }

    return wrapped as unknown as T;
}

/**
 * Method decorator to check if the request body is valid
 *
 * @param method
 * @constructor
 */
export function AllowMethod(method: string | string[]): MethodDecorator {
    return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = checkMethod(originalMethod, method);
    };
}

/**
 * Wrapper function to check if the request body is valid
 *
 * @param func
 */
export function checkBody<T extends Function>(func: T): T {
    const wrapped = async function (this: typeof func, request: NextRequest, args: any[]) {

        let body;
        try {
            body = await request.clone().json();
        } catch {
            return Response.badRequest("Invalid request body");
        }

        if (!body) return Response.badRequest("Invalid request body");

        return func.call(this, request, args);
    }

    return wrapped as unknown as T;
}

/**
 * Method decorator to check if the request body is valid
 *
 * @param _target
 * @param _propertyKey
 * @param descriptor
 * @constructor
 */
export function CheckBody(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = checkBody(originalMethod);
}


/**
 * Wrapper function to check for errors
 *
 * @param func
 */
export function checkError<T extends Function>(func: Function): T {
    const databaseLogger = getDatabaseLogger({ name: "decorator:checkError" })
    const wrapped = async function (this: typeof func, request: NextRequest, args: any[]) {
        try {
            return await func.call(this, request, args);
        } catch (err: any) {
            await databaseLogger.error(err, err.message, true);
            return Response.internalServerError(err.message);
        }
    }

    return wrapped as unknown as T;
}

/**
 * Class decorator to check for errors
 *
 * @param target
 * @constructor
 */
export function CheckError(target: Function): void;
/**
 * Method decorator to check for errors
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */
export function CheckError(target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
export function CheckError(...args: any[]): any {
    if (args.length === 1 && typeof args[0] === 'function') {
        // Class decorator or wrapper function
        const target = args[0];
        // Get all property keys (method names) of the class prototype
        const keys = Object.getOwnPropertyNames(target.prototype);

        // Loop through each method of the class
        for (const key of keys) {
            // Store a reference to the original method
            const originalMethod = target.prototype[key];

            // Create a new method that wraps the original method with your middleware
            const newMethod = checkError(originalMethod)

            // Replace the original method with the new wrapped method
            Object.defineProperty(target.prototype, key, {
                value: newMethod,
                configurable: true,
                writable: true,
            });
        }
    } else if (args.length === 3 && typeof args[2] === 'object' && typeof args[2].value === 'function') {
        const [_target, _propertyKey, descriptor] = args;
        const originalMethod = descriptor.value;

        descriptor.value = checkError(originalMethod);
    } else {
        throw new Error('Invalid usage of AllowPermitted decorator');
    }
}
