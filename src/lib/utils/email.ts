import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// TODO: Create a template for email and add env variables


const send = async (to: string, subject: string, html: string) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        html: html
    });
};

const sendOTP = async (to: string, otp: string) => {
    await send(to, 'Email Confirmation OTP', `<h1>${otp}</h1>`);
};

const sendToken = async (to: string, token: string) => {
    await send(to, 'Email Confirmation', `<a>http://localhost:3000/confirm-email?token=${token}${token}</a>`);
};

const sendPasswordResetEmail = async (to: string, token: string) => {
    await send(to, 'Password Reset', `<a>http://localhost:3000/reset-password?token=${token}</a>`);
}

const sendPasswordResetOTP = async (to: string, otp: string) => {
    await send(to, 'Password Reset OTP', `<h1>${otp}</h1>`);
}


const Email = {
    send,
    sendOTP,
    sendToken,
    sendPasswordResetEmail,
    sendPasswordResetOTP
}

export default Email;