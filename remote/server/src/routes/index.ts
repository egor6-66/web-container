import express from 'express';

import * as WS from '../ws';

import build from './build';
import container from './container';
import module from './module';

function routes(ws: WS.IWS) {
    const router = express.Router();
    router.use(build(ws));
    router.use(module(ws));
    router.use(container(ws));

    return router;
}

export default routes;
