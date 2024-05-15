import express from 'express';
import { router } from './routes/router.js';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const PORT = 3130;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3130', 'http://18.159.26.145/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(router);

// starting the server
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening on port ${PORT}`);
});


