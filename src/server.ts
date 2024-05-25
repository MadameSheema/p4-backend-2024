import  express from 'express';
import  morgan  from 'morgan';
import  cors  from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());

app.get('/', async (_req, res) => {
    res.status(200).json({ok: true, message: 'Hi'})
});

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log('We are listening....');
});