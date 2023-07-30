import { UserSession } from "@src/lib/types";
import { generateToken, verifyToken } from "@src/lib/utils/jwt";
import { encrypt, decrypt } from "@src/lib/utils/encryption";

export const generateAccessToken = (
    payload: UserSession,
) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET not found');
    }

    if (!process.env.ACCESS_TOKEN_EXPIRY) {
        throw new Error('ACCESS_TOKEN_EXPIRY not found');
    }

    return generateToken(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        process.env.ACCESS_TOKEN_EXPIRY
    );
}

export const generateRefreshToken = (
    payload: UserSession,
) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET not found');
    }

    if (!process.env.REFRESH_TOKEN_EXPIRY) {
        throw new Error('REFRESH_TOKEN_EXPIRY not found');
    }

    return generateToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRY
    );
}

export const generateConfirmationToken = async (
    payload: UserSession,
) => {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY not found');
    }

    return await encrypt(JSON.stringify(payload));
}

export const verifyAccessToken = (
    token: string,
) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET not found');
    }

    return verifyToken(
        token,
        process.env.ACCESS_TOKEN_SECRET,
    );
}

export const verifyRefreshToken = (
    token: string,
) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET not found');
    }

    return verifyToken(
        token,
        process.env.REFRESH_TOKEN_SECRET,
    );
}

export const verifyConfirmationToken = async (
    token: string,
) => {
    if (!process.env.ENCRYPTION_KEY) {
        throw new Error('ENCRYPTION_KEY not found');
    }

    try {
        const decrypted = await decrypt(token);

        return {
            success: true,
            data: JSON.parse(decrypted) as UserSession,
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            data: {} as UserSession,
        };
    }
}