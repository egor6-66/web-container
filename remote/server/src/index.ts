import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import routes from './routes';
import WS from './ws';

function Bootstrap() {
    const app = express();
    const port = 9808;

    app.use(cors());
    app.use(bodyParser());
    dotenv.config({ path: path.resolve('.env') });

    const server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });

    const ws = WS(server);
    app.use(routes(ws));
}

Bootstrap();
