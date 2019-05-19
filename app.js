let mysql = require('mysql');
const Hapi = require('@hapi/hapi');

let conn = mysql.createConnection({
    host: '172.17.118.78',
    user: 'cgdavis',
    password: 'V%8HRLf9SwUx',
    database: 'people'
});

function getAllNames() {
    return new Promise(function(resolve, reject) {
        conn.query('Select * FROM person',
        function(err, res, rep) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

function getNameByLastName(lastName) {
    return new Promise(function(resolve, reject) {
        conn.query('SELECT * FROM person WHERE (last_name = ?)', lastName,
        function(err, res, rep) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

const init = async() => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            var allNames = getAllNames();
            return allNames;
        }
    });

    server.route({
        method: 'GET',
        path: '/getName/{name}',
        handler: (request, h) => {
            var oneName = getNameByLastName(request.params.name);
            return oneName;
        }
    });

    await server.start();
    console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

conn.connect(function(err) {
    if (err) {
        return console.error('Error: ' + err.message);
    }

    console.log('Connected to mysql database');
});

init();