import express, { Express } from 'express';
import cors from 'cors';
import config from 'config';
import routes from './routes';
import dbconnect from './utils/dbconnect';
import logger from './utils/logger';
const port = config.get<number>('port');

const app: Express = express();

app.use(cors());

app.use(express.json());
app.listen(port, async () => {
    await dbconnect();
    logger.info(`Server is running ${port}`);
    routes(app);
});
