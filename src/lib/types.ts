import { User } from "@prisma/client";
import { ERROR_CODE, STATUS, STATUS_CODE } from "@lib/constants";


export type UserSession = Omit<User, 'password' | 'created_at' | 'updated_at' | 'confirmed'>

export type Response = {
    statusCode: STATUS_CODE,
    response: {
        status: STATUS,
        message: string,
        code?: ERROR_CODE,
        data?: any,
        errors?: any,
    }
}
