import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testDbConnection } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateToken, type AuthenticatedRequest } from './middlewares/auth.middleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


testDbConnection();


app.use('/api/auth', authRoutes);

app.get('/api/protected-route', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    message: '¡Tienes acceso a esta ruta protegida con JWT!',
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
});