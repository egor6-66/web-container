import { Application } from 'express';

import { IWS, WS } from '../utils';

import localModules from './modules/localModules';
import modules from './modules/modules';
import remoteModules from './modules/remoteModules';
import container from './container';

function routes(app: Application, ws: IWS) {
    app.use('/modules', modules(ws));
    app.use('/containers', container(ws));
    app.use('/local_modules', localModules(ws));
    app.use('/remote_modules', remoteModules(ws));
}

export default routes;
