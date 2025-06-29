import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import routes from './routes';
import { WS } from './utils';

function Bootstrap() {
    const app = express();

    app.use(bodyParser());
    dotenv.config({ path: path.resolve('../.env') });
    const port = process.env.NODE_SERVER_PORT;

    const server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

    const ws = WS(server);
    routes(app, ws);
}

Bootstrap();
