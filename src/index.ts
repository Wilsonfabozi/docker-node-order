import express from 'express';
import cors from 'cors';
import CODES from './utils/codes';
import logger from './utils/logger';
// import authRoutes from './auth/auth.routes';
// import userRoutes from './user/user.routes';

// import mongodb from './database/mongodb';
// import postgres from './databse//postgres';
// const testDB = async() => {
//   // await postgres('users')
//   //   .first()

//   await mongodb.connect()
//   await mongodb.close()
// };

// testDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', '127.0.0.1'],
  credentials: true,
}));

const miliseconds = 1000;
const segundos = 60;
const minutos = 2;
const timeoutTime = miliseconds * segundos * minutos;

app.use((_req, res, next) => {
  res.setTimeout(timeoutTime, () => {
    // logger('error',`Sua requisição excedeu o tempo limite: ${timeoutTime} minutos`);

    // TODO: arrumar retorno
    res.status(CODES.TIMEOUT).send({
      titulo: 'Erro ao completar ação',
      mensagem: 'Tempo limite excedido',
    });
  });
  next();
});

// app.use('/api', authRoutes);
// app.use('/api', userRoutes);

app.use('/', (_req, res) => res.send('Aqui'));

app.listen(8080, () => {
  logger.info('listening on port 8080', { label: 'system' })
});

