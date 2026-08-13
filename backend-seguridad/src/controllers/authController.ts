import type { Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
    try {
        const { user, email, password } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        const { data: existingUser, error: searchError } = await supabase
            .from('users')
            .select('*')
            .or(`email.eq.${email},username.eq.${user}`)
            .maybeSingle();

        if (searchError) {
            console.error('Error en consulta de búsqueda:', searchError);
            return res.status(500).json({ message: 'Error interno en la base de datos.' });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario o el correo ya están registrados.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const now = new Date().toISOString();

        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    username: user,
                    email: email,
                    password: hashedPassword,
                    updatedAt: now
                },
            ])
            .select('id, username, email')
            .single();

        if (insertError) {
            console.error('Error al crear usuario en Supabase:', insertError);
            return res.status(500).json({ message: 'No se pudo crear el usuario.' });
        }

        return res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: newUser,
        });
    } catch (error: any) {
        console.error('Error en controlador register:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

//////////////////////////////////////////////////////////////

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
        }

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle();

        if (userError || !userData) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        const { password: _, ...userWithoutPassword } = userData;

        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: userWithoutPassword,
        });
    } catch (error: any) {
        console.error('Error en controlador login:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
};