import axios from 'axios';
import express from 'express';
import fs from 'fs';
import path from 'path';

function clientRedirect() {
    const router = express.Router();

    router.post('/clientRedirect', async (req, res) => {
        const { url, method, params, data } = req.body;

        switch (method) {
            case 'GET':
                try {
                    const extRes = await axios.get(url, { params });
                    res.status(200).send(extRes.data);
                } catch (e) {
                    res.status(500).end(e.message);
                }

                break;

            case 'POST':
                try {
                    const extRes = await axios.post(url, data);
                    res.status(200).send(extRes.data);
                } catch (e) {
                    res.status(500).end(e.message);
                }
        }
    });

    return router;
}

export default clientRedirect;
