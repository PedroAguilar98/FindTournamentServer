
var sql = require('mssql/msnodesqlv8');
require("msnodesqlv8");
const createExpressServer = require('routing-controllers')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
    const request = new sql.Request()
    request.query('select * from users', (err, result) => {
        // ... error checks

        console.log(result?.recordset[0]) // return 1

       res.send(result?.recordset[0])
    })
    
  })

app.listen(port, () => {
    var config = {
        connectionString: 'Driver=SQL Server;Server=LAPTOP-B149ENMA\\SQLEXPRESS;Database=project;Trusted_Connection=yes;',
    };

    sql.connect(config)
        .then(function () {
            console.log("connected to ", app.path);
           
        })
        .catch(function (err) {
            console.log("err", err)
        });

})