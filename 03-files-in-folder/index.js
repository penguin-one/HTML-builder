const path = require('path');
const { stat } = require('fs');
const { readdir } = require('fs/promises');

readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })
        .then(files => files.forEach(file => {

          if(file.isFile()) {
            stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {

              console.log(`${file.name.split('.')[0]} - ${file.name.split('.').at(-1)} - ${stats.size} bytes`);

            });
          }

        }));