import fs from 'fs';
import path from 'path';

function writeFileSyncWithMkdirAsync(filePath: string, data: any, options = {}) {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, data, options);
}

export default writeFileSyncWithMkdirAsync;
