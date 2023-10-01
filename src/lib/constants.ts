export enum STATUS_CODE {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
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
    UNAUTHORIZED = 'error:unauthorized',
    NOT_FOUND = 'error:not_found',
    UNPROCESSABLE_ENTITY = 'error:unprocessable_entity',
    METHOD_NOT_ALLOWED = 'error:method_not_allowed',
    INTERNAL_SERVER_ERROR = 'error:internal_server_error',
    BAD_REQUEST = 'error:bad_request',
    VALIDATION_ERROR = 'error:validation_error',
    INVALID_CREDENTIALS = 'error:invalid_credentials',
    FORBIDDEN = 'error:forbidden',
}


export enum TOKEN_TYPE {
    EMAIL_CONFIRMATION_TOKEN = 'token:email_confirmation',
    PASSWORD_RESET_TOKEN = 'token:password_reset',
    EMAIL_CONFIRMATION_OTP = 'otp:email_confirmation',
    PASSWORD_RESET_OTP = 'otp:password_reset',
}

export const TOKEN_OTP_EXPIRY = 60 * 60 * 1000; // 1 hour

export enum ORDER_STATUS {
    PENDING_PAYMENT = 'pending_payment',
    PROCESSING = 'processing',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export const COMMON_RESOURCES = [
    "GET/api/products",
    "GET/api/products/:id",
    "GET/api/products/:id/variants",
    "GET/api/products/:id/reviews",
    "GET/api/products/:id/categories",
    "GET/api/variants",
    "GET/api/variants/:id",
    "GET/api/variants/:id/reviews",
    "GET/api/variants/:id/reviews/:reviewId",
    "GET/api/categories",
    "GET/api/categories/:id",
    "GET/api/categories/:id/products",
    "GET/api/shipping-methods",
    "GET/api/shipping-methods/:id",
    "GET/api/coupons/:code"
];

export enum PAYMENT_METHODS {
    CREDIT_CARD= "payment-method:credit_card",
    PAYPAL = "payment-method:paypal",
    GOOGLE = "payment-method:google"
}

export enum COUPON_TYPES {
    PERCENT = "percent",
    FIXED = "fixed"
}