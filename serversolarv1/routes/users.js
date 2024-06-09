const express = require('express');
const router = express.Router();

const https = require('https');

const apiUrl = 'https://re.jrc.ec.europa.eu/api/v5_2/MRcalc?lat=40.463667&lon=-3.74922&horirrad=1&outputformat=json';

const users = [{name: 'Tony', email: 'tony@mymail.com'}]

let promedioHhm;

//const eprad = {lat: '40.463667', lon: '-3.74922', eprad: 'valor de eprad'}
let eprad = [{"eprad": 148.123456}];

router.get('/', (_, res) => {
    res.send('Your Express App, ' + 'eprad es: ' + eprad[0].eprad);
});

router.get('/users', (_, res) => {
    res.json({ ok:true, users });
});

router.get('/user/:name', (req, res) => {
    const { name } = req.params;
    const user = users.filter((user) => user.name === name)[0];
    res.json({ ok: true, user });
});

router.post('/user', (req, res) => {
    const { name, email } = req.body;
    if (name && email) {
        users.push({ name, email });
        res.json({ ok: true, users });
    }
});


router.post('/eprad', (req, res) => {
    const { lon, eprad } = req.body;
    if (lon && eprad) {
        users.push({ lon, eprad });
        res.json({ ok: true, eprad });
    }
});


router.get('/eprad', (_, res) => {
    res.json({ ok:true, eprad });

    valor = fetchData(apiUrl);
    console.log(`El valor valor es: ${valor} `);

    eprad = [{eprad: valor}];

});


module.exports = router;



function fetchData(url) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Datos recibidos desde users-server:', data);


            try {
                const jsonData = JSON.parse(data); // Convierte los datos a un objeto JSON
                console.log('Datos recibidos en json desde users-server:', jsonData);

                // Obtén los valores de H(h)_m de cada mes
                const valoresHhm = jsonData.outputs.monthly.map(mes => mes["H(h)_m"]);                                              
                // Calcula la suma de todos los valores
                const sumaValores = valoresHhm.reduce((acumulador, siguienteValor) => acumulador + siguienteValor, 0);                    
                // Calcula el promedio
                promedioHhm = sumaValores / jsonData.outputs.monthly.length;                    
                console.log(`El promedio de H(h)_m es: ${promedioHhm} kWh/m2/mo`);
            } catch (error) {
                console.error('Error al analizar los datos JSON en users-server:', error.message);
            }

            console.log(`prueba El promedio de H(h)_m es: ${promedioHhm} kWh/m2/mo`);
            
            

        });
    });

    req.on('error', (error) => {
        console.error('Error al realizar la solicitud:', error.message);
    });
    req.end();

    return promedioHhm;
   
}



