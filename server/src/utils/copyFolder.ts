import fs from 'fs';

async function copyFolder(from: string, to: string) {
    return new Promise((resolve, reject) => {
        fs.cp(from, to, { recursive: true }, (err) => {
            err ? reject(err) : resolve('');
        });
    });
}

export default copyFolder;
