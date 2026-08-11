import type { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { access } from "node:fs";

export const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email, password} = req.body;

        if (!email|| !password){
            res.status(400).json({ error: 'el email y la contra son obligatorias'});
            return;
        }

        const userExists = await prisma.user.findUnique({
            where: { email},
        });

        if (userExists){
            res.status(400).json({error: 'el usuario ya se encuentra registrado.'});
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
            },
            select: {
                id:true,
                email:true,
                createdAt:true,
            },
        });

        res.status(201).json({
            Message: 'usuario registrado exitosamente',
            user: newUser,
        });
    }catch(error){
        console.error('error en register:',error);
        res.status(500).json({error: 'error interno al registrar el usuario'});
    }
};

export const login = async ( req: Request, res: Response): Promise<void> => {
    try{
        const { email, password} = req.body;

        if(!email || !password){
            res.status(400).json({error: 'El email y la contraseña son obligatorios.'})
            return;
        }

        const user = await prisma.user.findUnique({
            where: {email},
        });

        if (!user){
            res.status(401).json({ error: 'credenciales incorrectas'});
            return;
        }

        const isPassValid = await bcrypt.compare(password, user.password);
        if(!isPassValid){
            res.status(401).json({error: 'credenciales incorrectas'});
            return;
        }

        const secret = process.env.JWT_SECRET || 'secret_key';
        const expiresInEnv = process.env.JWT_EXPIRES_IN || '1h';

        const token = jwt.sign(
            { id: user.id, email: user.email },
            secret,
            { expiresIn: expiresInEnv as number | `${number}h` | `${number}d` | `${number}m` }        );

        res.json({
            access_token: token,
            token_type: 'Bearer',
        });
    } catch (error) {
        console.error('error en login:', error);
        res.status(500).json({ error: 'error interno al iniciar sesión' });
    }
};