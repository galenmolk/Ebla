const abilityRoutes = (app, fs) => {
    // Variables
    const dataPath = './data/abilities.json';

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
    app.get('/abilities', (req, res) => {
        readFile(data => {
            res.send(data);
        }, true);
    });

    // CREATE
    app.post('/abilities', (req, res) => {
        readFile(data => {
            
            const ability = JSON.parse(req.body);
            const id = ability['Id'];
            data[id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('New Ability added');
            });
        }, true);
    });

    // UPDATE
    app.put('/abilities/:id', (req, res) => {
        readFile(data => {
            const id = req.params['id'];
            data[id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`Ability ID: ${id} updated`);
            });
        }, true);
    });

    // DELETE
    app.delete('/abilities/:id', (req, res) => {
        readFile(data => {
            const id = req.params['id'];
            delete data[id];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`Ability ID:${id} removed`);
            });
        }, true);
    })
};

module.exports = abilityRoutes;
