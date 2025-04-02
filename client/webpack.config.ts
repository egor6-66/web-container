import { configuration, defaultPaths, IEnvVariables } from '@packages/webpack';
import path from 'path';

import packageJson from './package.json';

export default (env: IEnvVariables) => {
    return configuration({
        mode: env.mode ?? 'development',
        paths: {
            static: env.devServer ? '/' : './',
            ...defaultPaths(__dirname),
            envFile: path.resolve('..', `.env.${env.mode}`),
        },
        devServer: {
            active: env.devServer,
            port: env.port ?? 3000,
        },
        analyzer: env.analyzer,
        version: packageJson.version,
        aliases: {
            '@': path.resolve('src'),
        },
        manifest: {
            name: packageJson.name,
            displayName: 'WEB_CONTAINER',
        },
    });
};
