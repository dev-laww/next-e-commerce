import { NextRequest } from "next/server";
import Response from "@lib/http";
import PermissionController from "@controller/permission.controller";

export function withPermission<T extends Function>(target: T): T {
    const wrapped = async function (this: typeof target, request: NextRequest) {
        const isAllowed = await PermissionController.isAllowed(request);

        return isAllowed ? target.call(this, request) : Response.forbidden;
    }

    return wrapped as unknown as T;
}

export function AllowPermitted(target: Function): void;
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


export function checkMethod<T extends Function>(func: T, method: string | string[]): T {
    const wrapped = async function (this: typeof func, request: NextRequest) {
        if (Array.isArray(method) && !method.includes(request.method)) return Response.methodNotAllowed;

        if (typeof method === "string" && method !== request.method) return Response.methodNotAllowed;

        return func.call(this, request);
    }

    return wrapped as unknown as T;
}

export function AllowMethod(methods: string | string[]): MethodDecorator {
    return function (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = checkMethod(originalMethod, methods);
    };
}

export function checkBody<T extends Function>(func: T): T {
    const wrapped = async function (this: typeof func, request: NextRequest) {

        let body;
        try {
            body = await request.clone().json();
        } catch {
            return Response.badRequest("Invalid request body");
        }

        if (!body) return Response.badRequest("Invalid request body");

        return func.call(this, request);
    }

    return wrapped as unknown as T;
}

export function CheckBody(_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = checkBody(originalMethod);
}
