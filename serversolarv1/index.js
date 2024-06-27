const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');

const app = express();
const port = process.env.PORT || 4041;

const apiUrl = 'https://re.jrc.ec.europa.eu/api/v5_2/MRcalc?lat=40.463667&lon=-3.74922&horirrad=1&outputformat=json';

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.use('/', require('./routes/users'));

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);

    fetchData(apiUrl);

});



function fetchData(url) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Puedes ajustar los encabezados según tus necesidades
        },
    };

    const req = https.request(url, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Datos recibidos en index.js del backend express node:', data);
        });
    });

    req.on('error', (error) => {
        console.error('Error al realizar la solicitud:', error.message);
    });

    req.end();
}



