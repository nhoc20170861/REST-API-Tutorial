import mongoose from 'mongoose';
import config from 'config';
import log from './logger';
async function dbconnect() {
    const dbUri = config.get<string>('dbUri');
    log.info(`Connect to mongodb: ${dbUri} `);
    try {
        await mongoose.connect(dbUri, {});
        log.info(`Connected mongodb`);
    } catch (error) {
        log.error("Can't connect to mongodb");
        process.exit(1);
    }
}
export default dbconnect;
