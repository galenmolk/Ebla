const galleryRoutes = (app, fs) => {
    // Variables
    const dataPath = './data/gallery.json';
    const gallery = 'gallery';
    const cuid = require('cuid');
    
    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
    ) => {
        fs.writeFile(filePath, fileData, encoding, err => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/gallery', (req, res) => {
        readFile(data => {
            res.send(data);
        }, true);
    });

    // CREATE
    app.post('/gallery', (req, res) => {
        readFile(data => {

            console.log('Ebla POST began.')
            console.log(req.body);
            
            let id = cuid();
            req.body['Id'] = id;
            
            data[gallery].push(req.body);
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(id);
            });
        }, true);
    });

    // DELETE
    app.delete('/gallery/:id', (req, res) => {
        readFile(data => {
            const id = req.params['id'];

            const gal = data[gallery];

            data[gallery] = gal.filter(function(item) {
                return item['Id'] !== id;
            });
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`Gallery element ID:${id} removed`);
            });
        }, true);
    })
};

module.exports = galleryRoutes;
