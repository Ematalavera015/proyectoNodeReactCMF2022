import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const nodeMailer = (req, res) => {
    var transporter = nodemailer.createTransport({
        host: process.env.HOST_NODEMAILER,
        port: process.env.PORT_NODEMAILER,
        secure: false,
        auth: {
            user: process.env.USER_NODEMAILER,
            pass: process.env.PASS_NODEMAILER
        },
    });

    var mailOptions = {
        from: process.env.USER_NODEMAILER,
        to: req.newUser.email,
        subject: 'Registro de usuario a ecommerce',
        text: `Bienvenido ${req.newUser.name} a nuestra plataforma de CFM 2022 aplicando Node js en Blimop`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log('USER MAIL ', req.newUser);
            res.status(200).json(req.newUser);
        }
    });
};