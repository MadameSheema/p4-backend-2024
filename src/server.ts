import  express from 'express';
import  morgan  from 'morgan';
import  cors  from 'cors';
import dogsRouter from './dogs';
import { defaultErrorHandler } from './errors';

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

app.use('/dogs', dogsRouter)

app.use(defaultErrorHandler);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log('We are listening....');
});