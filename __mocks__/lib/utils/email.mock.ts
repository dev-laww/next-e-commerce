const send = jest.fn(
    (to: string, subject: string, html: string) => Promise.resolve()
);

const sendOTP = jest.fn(
    async (to: string, otp: string) => Promise.resolve()
);

const sendToken = jest.fn(
    async (to: string, token: string) => Promise.resolve()
);

const sendPasswordResetEmail = jest.fn(
    async (to: string, token: string) => Promise.resolve()
);

const sendPasswordResetOTP = jest.fn(
    async (to: string, otp: string) => Promise.resolve()
);

const Email = {
    send,
    sendOTP,
    sendToken,
    sendPasswordResetEmail,
    sendPasswordResetOTP
}

module.exports = {
    __esModule: true,
    default: Email
};
