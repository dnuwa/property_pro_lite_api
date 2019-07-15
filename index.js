import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(routes);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

export default app;
