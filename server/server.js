const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/save-data', (req, res) => {
    const formData = req.body;
    const filePath = path.join(__dirname, 'database.json');

    fs.readFile(filePath, (err, data) => {
        let json = [];
        if (!err) {
            json = JSON.parse(data);
        }
        json.push(formData);

        fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                res.status(500).json({ message: 'Error saving data' });
            } else {
                res.status(200).json({ message: 'Data saved successfully' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
