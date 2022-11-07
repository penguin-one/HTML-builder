const path = require('path');
const fs = require('fs');
const { stdin } = process;
const output= fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if(err) throw err;
        console.log('Привет! Введите текст:');
    }
);

stdin.on('data', data => {
    if(data.toString().trim() == 'exit') {
        console.log('Пока!');
        process.exit();
    } else {
        output.write(data);
    }
});

process.on('SIGINT', () => {
    console.log('Пока!');
    process.exit();
});