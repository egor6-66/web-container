import express from 'express';
import fs from 'fs';
import path from 'path';

import * as WS from '../ws';

function module(ws: WS.IWS) {
    const { io, clients } = ws;
    const router = express.Router();
    const pathToModulesDir = path.resolve('..', 'modules');
    const pgPath = 'package.json';

    router.get('/available_modules', async (req: any, res: any) => {
        try {
            const modules: any = [];
            fs.readdirSync(pathToModulesDir).forEach((module) => {
                if (module !== 'host') {
                    const newModule: any = {
                        builds: [],
                        name: module,
                    };

                    const builds = fs.readdirSync(path.join(pathToModulesDir, module));
                    builds.forEach((build) => {
                        newModule.builds.push(build);
                        const manifest = fs.readFileSync(path.join(pathToModulesDir, module, build, pgPath), 'utf8');
                        newModule.builds.push({ manifest: { ...JSON.parse(manifest) }, buildName: build });
                    });
                    modules.push(newModule);
                }
            });
            res.send(modules);
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.get('/module', async (req: any, res: any) => {
        try {
            const { name } = req.query;
            const builds = fs.readdirSync(path.join(pathToModulesDir, name));
            const build = fs.readdirSync(path.join(pathToModulesDir, name))[0];
            const manifest = fs.readFileSync(path.join(pathToModulesDir, name, build, pgPath), 'utf8');
            res.send({ manifest: JSON.parse(manifest), builds });
            res.send(builds);
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    return router;
}

export default module;
