import { PageToken, UserSession } from "@lib/types";
import { generateToken, verifyToken } from "@utils/jwt";
import crypto from "crypto";

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

export const verifyAccessToken = async (
    token: string,
): Promise<UserSession | undefined> => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET not found');
    }

    try {
        return await verifyToken(
            token,
            process.env.ACCESS_TOKEN_SECRET,
        );
    } catch (err) {
        return undefined;
    }
}

export const verifyRefreshToken = async (
    token: string,
): Promise<UserSession | undefined> => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('REFRESH_TOKEN_SECRET not found');
    }

    try {
        return await verifyToken(
            token,
            process.env.REFRESH_TOKEN_SECRET,
        );
    } catch (err) {
        return undefined;
    }
}

export const generateRandomToken = () => crypto.randomBytes(32).toString('hex');

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export function generatePageToken<T>(token: T) {
    const userJson = JSON.stringify(token);

    return Buffer.from(userJson).toString("base64");
}

export function parsePageToken<T>(token: string): PageToken<T> | undefined {
    try {
        const userJson = Buffer.from(token, "base64").toString("ascii");

        return JSON.parse(userJson);
    } catch (err) {
        return undefined;
    }
}

export function generateCouponCode(length: number = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let coupon = "";

    for (let i = 0; i < length; i++) {
        coupon += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return coupon;
}

