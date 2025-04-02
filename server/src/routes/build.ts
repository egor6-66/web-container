import Promise from 'bluebird';
import express from 'express';
import fs from 'fs';
import path from 'path';

import { getFile, parseRequest } from '../multipart';
import * as WS from '../ws';
import { extractFiles } from '../zip';
const pathToModulesDir = path.resolve('..', 'modules');

function build(ws: WS.IWS) {
    const { io, clients } = ws;
    const router = express.Router();

    router.delete('/build', async (req, res) => {
        try {
            const { name, version, msg } = req.query;
            clients.forEach((i) => {
                io.to(i).emit('receiveMessage', msg);
            });
            fs.rmSync(path.join(pathToModulesDir, String(name), String(version)), { recursive: true });

            res.status(200).send('');
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.post('/activate', async function (req, res) {
        try {
            const body = req.body;
            const pathToModule = path.join(pathToModulesDir, body.name);
            const pathToBuild = path.join(pathToModule, body.version);
            const pathToLatest = path.join(pathToModule, 'latest');

            if (!fs.existsSync(pathToLatest)) {
                fs.renameSync(pathToBuild, pathToLatest);
            } else {
                const manifest = fs.readFileSync(path.join(pathToLatest, 'manifest.json'), 'utf8');
                const parseManifest = JSON.parse(manifest);
                fs.renameSync(pathToLatest, path.join(pathToModule, parseManifest.version));
                fs.renameSync(pathToBuild, pathToLatest);
            }

            res.status(200).end();
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.post('/build', async function (req, res) {
        try {
            const body = await parseRequest(req);
            const bodyFile = getFile(body, 'file');

            if (!/\.zip$/.test(bodyFile.originalFilename)) {
                res.status(200).json({ notice: 'not a zip archive, skipping' });

                return;
            }

            clients.forEach((i) => {
                io.to(i).emit('receiveMessage', `новый билд ${bodyFile.originalFilename}`);
            });
            const archiveFiles = await extractFiles(bodyFile);

            const paths = bodyFile.originalFilename.split('_');
            const version = paths.pop().split('.').slice(0, -1).join('.');
            const name = paths.join('_');

            const pathToModule = path.join(pathToModulesDir, name);
            const pathToBuild = path.join(pathToModule, version);

            if (!fs.existsSync(pathToModule)) {
                fs.mkdirSync(pathToModule, { recursive: true });
            }

            if (!fs.existsSync(pathToBuild)) {
                fs.mkdirSync(pathToBuild, { recursive: true });
            }

            await Promise.each(archiveFiles, async (file: any) => {
                const dirs = file.originalFilename;
                const dirPath = path.join(pathToBuild, dirs);
                fs.writeFileSync(dirPath, file.buffer);
            });
            res.status(200).end();
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    return router;
}

export default build;
