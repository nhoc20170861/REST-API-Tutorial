import pino from 'pino';
import dayjs from 'dayjs';          // Document : https://www.npmjs.com/package/dayjs
import pretty from 'pino-pretty';   // Document : https://github.com/pinojs/pino-pretty#programmatic-integration
const stream = pretty({
    colorize: true,
    ignore: 'pid,hostname',         // --ignore
    include: 'level,time',          // --i
    
    customPrettifiers: {
        time: ()=> `[${dayjs().format('MMM D, YYYY h:mm A')}]`,
        
    },      
});
const logger = pino(stream);

export default logger;
