import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import cmd from 'node-cmd';
import os from 'os';
import path from 'path';
import * as process from 'process';

import * as WS from '../ws';

function container(ws: WS.IWS) {
    const { io, clients } = ws;
    const router = express.Router();
    dotenv.config({
        path: path.resolve('.env.development'),
    });

    router.post('/connect', async (req: any, res: any) => {
        const body = req.body;
        console.log(req.body);

        const getMsg = (scope: 'local' | 'remote') => {
            return `successful connection🎉 \nhost: ${body.host}\nos: ${os.type()}\narch: ${os.arch()}\nscope: ${scope}`;
        };

        try {
            if (body?.hosts?.length) {
                await axios.post(`https://${body.hosts[0]}/api/connect`, null);
            }

            res.status(200).send(getMsg('remote'));
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.get('/folders_tree', async (req: any, res: any) => {
        const query = req.query;

        try {
            res.status(200).send(buildTree(query.path || path.resolve('..')));
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    router.post('/command', async (req: any, res: any) => {
        const body = req.body;

        try {
            cmd.run(req.body.command, function (err, data, stderr) {
                clients.forEach((i) => {
                    io.to(i).emit('terminal', data);
                });
            });
            res.status(200).send();
        } catch (e) {
            res.status(500).end(e.message);
        }
    });

    return router;
}

class TreeNode {
    public path: string;
    public node: Array<TreeNode>;
    public nestedNode: boolean;
    public isDir: boolean;
    public name: string;
    public ext: string;
    constructor(path: string) {
        this.path = path;
        this.node = [];
        this.nestedNode = false;
        this.isDir = false;
        this.name = '';
        this.ext = '';
    }
}

function buildTree(rootPath = '..', levels = 2) {
    const root = new TreeNode(rootPath);
    let lvl = levels;
    const stack = [root];

    while (stack.length && lvl) {
        const currentNode = stack.pop();
        lvl -= 1;

        if (currentNode) {
            const children = fs.readdirSync(currentNode.path);

            for (const child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const childNode = new TreeNode(childPath);
                childNode.name = child;

                if (fs.statSync(childNode.path).isDirectory()) {
                    const dirs = fs.readdirSync(childNode.path);

                    childNode.nestedNode = !!dirs.length;
                    childNode.isDir = true;
                    stack.push(childNode);
                } else {
                    const ext = path.extname(child);

                    childNode.ext = ext?.split('')?.slice(1, 5).join('') || '?';
                }

                currentNode.node.push(childNode);
            }
        }
    }

    return root;
}

export default container;
