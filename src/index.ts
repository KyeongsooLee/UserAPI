import express from 'express';
import { connectMongoDB, connectPostgres } from './database';
import routes from './routes/index';

const app = express();
const cors = require('cors');
app.use(express.static('./src'))
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

app.use('/api', routes.authRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

const port = 3000;
const server = app.listen(port, () => {
  connectMongoDB();
  connectPostgres();
  console.log(`Server is running on http://localhost:${port}`);
});

export default server;