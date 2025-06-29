import fs from 'fs';
import path from 'path';

function clearFolderSync(folderPath: string) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file) => {
            const filePath = path.join(folderPath, file);

            if (fs.lstatSync(filePath).isDirectory()) {
                fs.rmSync(filePath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }
}

export default clearFolderSync;
