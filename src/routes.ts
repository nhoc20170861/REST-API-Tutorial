import { Request, Response, Express } from 'express';
import validate from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createUserHandle } from './controller/user.controller';
function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.status(200).send('ok');
    });

    app.post('/api/users', validate(createUserSchema), createUserHandle);
}

export default routes;
