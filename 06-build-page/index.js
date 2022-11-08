const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

fs.mkdir(path.join(__dirname, 'project-dist'), error => {
    if(error) throw error;
    console.log('A folder project-dist was created');
});

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8');

async function bundleCSS() {
    const files = await readdir(path.join(__dirname, 'styles'), { withFileTypes: true });

    files.forEach((file) => {
        if(file.isFile() && path.extname(path.join(__dirname, 'styles', file.name)) == '.css') {
            let allCSS = '';

            const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
            input.on('data', chunk => allCSS += chunk);
            input.on('end', () => output.write(allCSS));
            input.on('error', error => console.log('Error:', error.message));
        }
    });
}

bundleCSS();