import Cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';
import swaggerDoc from './swagger.json';

dotenv.config();

const app = express();

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(Cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(routes);

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const { PORT } = process.env || 5000;

app.listen(PORT);

export default app;
