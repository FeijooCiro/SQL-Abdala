var express = require('express')
var router = express.Router()

var bd = require('./bd')

//Creación de la tabla
router.get('/creartabla', function (req, res, next) {
    bd.query('drop table if exists clientes', function (error, resultado) {
        if (error) {
            console.log(error)
            return
        }
    })
    bd.query('create table clientes (' +
        'idClientes int not null primary key auto_increment, ' +
        'nombre varchar(50) not null, ' +
        'apellido varchar(50) not null, ' +
        'FechaNac date not null, ' +
        'peso float not null, ' +
        'altura float not null, ' +
        'localidad varchar(50) not null,' +
        'nombreCalleDomicilio varchar(50) not null, ' +
        'numeroCalleDomicilio int not null, ' +
        'Movil01 int not null, ' +
        'Movil02 int, ' +
        'email varchar(50) not null' +
        ')', function (error, resultado) {
            if (error) {
                console.log(error)
                return
            }
    })
    res.render('mensaje', { mensaje: 'La tabla se creo correctamente.' })
})



//Alta de registros
router.get('/incluir', function (req, res, next) {
    res.render('incluirdatos')
})

router.post('/incluir', function (req, res, next) {
    const registro = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        FechaNac: req.body.FechaNac,
        peso: req.body.peso,
        altura: req.body.altura,
        localidad: req.body.localidad,
        nombreCalleDomicilio: req.body.nombreCalleDomicilio,
        numeroCalleDomicilio: req.body.numeroCalleDomicilio,
        Movil01: req.body.Movil01,
        Movil02: req.body.Movil02,
        email: req.body.email
    }
    bd.query('insert into clientes set ?', registro, function (error, resultado) {
        if (error) {
            console.log(error)
            return
        }
    })
    res.render('mensaje', { mensaje: 'La carga se efectuo correctamente.' })
})


//Listado de registros
router.get('/listado', function (req, res, next) {
    bd.query('select * from clientes', function (error, filas) {
        if (error) {
            console.log('error en el listado' + error)
            return
        }
        res.render('listarcompleto', { clientes: filas })
    })
})

//Listado de registros con con datos de peso mayores a 90 y altura mayores a 1,78.
router.get('/SegListado', function (req, res, next) {
    bd.query('select * from clientes where peso > 90 and altura > 1.78', function (error, filas) {
        if (error) {
            console.log('error en el listado')
            return
        }
        res.render('listarcompleto', { clientes: filas })
    })
})

//Listado de registros con datos de localidad que no sean Mar del Plata e email que tengan gmail.
router.get('/TerListado', function (req, res, next) {
    bd.query(`select * from clientes where localidad <> 'Mar del Plata' and SUBSTRING(email, LOCATE('@gmail.com', email) + 1, LENGTH(email)) = 'gmail.com'`, function (error, filas) {
        if (error) {
            console.log('error en el listado', error)
            return
        }
        res.render('listarcompleto', { clientes: filas })
    })
})

//Calculo del promedio de altura
router.get('/PromedioAltura', function (req, res, next) {
    bd.query(`select AVG(altura) AS promedio from clientes`, function (error, filas) {
        if (error) {
            console.log('error en el listado', error)
            return
        }
        res.render('mensaje', {mensaje: 'El promedio es: ' + filas[0].promedio})
    })
})

// Cálculo del máximo valor de peso
router.get('/MaximoPeso', function (req, res, next) {
    bd.query(`SELECT MAX(peso) AS maximo FROM clientes`, function (error, filas) {
        if (error) {
            console.log('error en el listado', error);
            return;
        }

        const maximoPeso = filas[0].maximo;

        bd.query('SELECT nombre FROM clientes WHERE peso = ?', [maximoPeso], function (error, resultado) {
            if (error) {
                console.log('error en la consulta', error);
                return;
            }

            const nombreCliente = resultado[0].nombre;
            res.render('mensaje', { mensaje: 'El cliente con mayor peso es ' + nombreCliente + ', con un peso de ' + maximoPeso});
        });
    });
});

// Cálculo del cliente con menor edad de todos
router.get('/MenorEdad', function (req, res, next) {
    bd.query(`
        SELECT nombre, TIMESTAMPDIFF(YEAR, FechaNac, CURDATE()) AS MenorEdad
        FROM clientes
        ORDER BY MenorEdad ASC
        LIMIT 1;
    `, function (error, filas) {
        if (error) {
            console.log('error en el listado', error);
            return;
        }

        const nombreCliente = filas[0].nombre;
        const MenorEdad = filas[0].MenorEdad;

        res.render('mensaje', { mensaje: 'El cliente con menor edad es ' + nombreCliente + ', con una edad de ' + MenorEdad + ' años.' });
    });
});

//Consulta
router.get('/consulta', function (req, res, next) {
    res.render('consultacliente')
})

router.post('/consulta', function (req, res, next) {
    bd.query('select * from clientes where idClientes=?', req.body.idClientes, function (error, filas) {
        if (error) {
            console.log('error en la consulta')
            return
        }
        if (filas.length > 0) {
            res.render('listadoconsultas', { clientes: filas })
        } else {
            res.render('mensaje', { mensaje: 'No existe el id del cliente ingresado.' })
        }
    })
})


//Modificacion
router.get('/modificacion', function (req, res, next) {
    res.render('consultamodificacion')
})

router.post('/modificar', function (req, res, next) {
    bd.query('select nombre, apellido, FechaNac, peso, altura, localidad, nombreCalleDomicilio, numeroCalleDomicilio, Movil01, Movil02, email from clientes where idClientes=?', req.body.idClientes, function (error, filas) {
        if (error) {
            console.log('error en la consulta')
            return
        }
        if (filas.length > 0) {
            res.render('formulariomodifica', { clientes: filas })
        } else {
            res.render('mensaje', { mensaje: 'No existe el id del cliente ingresado.' })
        }
    })
})

router.post('/confirmarmodifica', function (req, res, next) {
    const registro = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        FechaNac: req.body.FechaNac,
        peso: req.body.peso,
        altura: req.body.altura,
        localidad: req.body.localidad,
        nombreCalleDomicilio: req.body.nombreCalleDomicilio,
        numeroCalleDomicilio: req.body.numeroCalleDomicilio,
        Movil01: req.body.Movil01,
        Movil02: req.body.Movil02,
        email: req.body.email
    }
    bd.query('UPDATE clientes SET ? WHERE ?', [registro, { idClientes: req.body.idClientes }], function (error, filas) {
        if (error) {
            console.log('error en la consulta')
            console.log(error)
            return
        }
        res.render('mensaje', { mensaje: 'El cliente fue modificado.' })
    })
})


module.exports = router