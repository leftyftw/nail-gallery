const child_process = require("child_process");
const process = require('process');
const path = require('path');
const fs = require('fs');


const zipper = {
    createZipFile: dir => {
        dir = path.join(process.cwd(), 'src', dir);
        
        const zipFilePath = path.join(dir, 'swatches.zip');
        if (!fs.existsSync(zipFilePath)) {
            child_process.execSync(`rm -rf \\@eaDir && zip -r swatches.zip *`, {
                cwd: dir
            });
        }
        
        return { fileName: 'swatches.zip', path: dir };
    }
}

module.exports = zipper;