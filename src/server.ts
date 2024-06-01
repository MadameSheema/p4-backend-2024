import  express from 'express';
import  morgan  from 'morgan';
import  cors  from 'cors';
import ownersRouter from './owners'
import dogsRouter from './dogs';
import roomsRouter from './rooms';
import bookingsRouter from './bookings'
import { defaultErrorHandler } from './errors';

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

app.use('/owners', ownersRouter)
app.use('/dogs', dogsRouter)
app.use('/rooms', roomsRouter)
app.use('/bookings', bookingsRouter)

app.use(defaultErrorHandler);

const { PORT } = process.env || 3000;

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error}`);
        process.exit(1);
    }
}

startServer();