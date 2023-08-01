import { UserSession } from "@src/lib/types";
import { generateToken, verifyToken } from "@src/lib/utils/jwt";
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

export const generateRandomToken  = () => crypto.randomBytes(32).toString('hex');

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

