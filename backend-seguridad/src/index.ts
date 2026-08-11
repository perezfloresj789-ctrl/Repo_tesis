import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import { authRouter } from './routes/authRoutes.js';
import { authenticateToken, type AuthenticatedRequest } from './middlewares/auth.js';
import { timeStamp } from 'node:console';
import { json } from 'node:stream/consumers';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'servidor express corriendo correctamente',
        timeStamp: new Date().toISOString()
    });
});

app.use('/auth', authRouter);

app.get('/geodata/incidentes', authenticateToken, (req: AuthenticatedRequest, res) => {
    res.json({
        message: `Acceso autorizado para el usuario ID: ${req.user?.id} (${req.user?.email})`,
        data: []
    });
});

app.listen(PORT, () => {
    console.log('servidor ejecutandose en http://localhost:${PORT}')
})