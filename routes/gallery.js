const galleryRoutes = (app, fs) => {
    // Variables
    const dataPath = './data/gallery.json';
    const gallery = 'gallery';
    
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

            data[gallery].push(req.body);
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('New Ability added');
            });
        }, true);
    });

    // DELETE
    app.delete('/abilities/:id', (req, res) => {
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
