const path = require('path');
const { rm, mkdir, readdir, copyFile } = require('fs/promises');

async function copyFiles() {
    if(path.join(__dirname, 'files-copy')) {
        await rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true });
    }

    await mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

    await readdir(path.join(__dirname, 'files'), { withFileTypes: true })
                .then(files => files.forEach(file => {

                    if(file.isFile()) {
                        copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
                }

                }));
}

copyFiles();