const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql');

//midleware
app.use(cors());
app.use(express.json());

//database connection
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "studentsdb"
});

//check connection
mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/students', (req, res) => {
    let numberOfResult;
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    let skip = page * size;

    mysqlConnection.query('SELECT * FROM STUDENTS_INFO', (err, rows) => {
        if (err) throw err
        else {
            numberOfResult = rows.length
            mysqlConnection.query(`SELECT * FROM STUDENTS_INFO LIMIT ${skip}, ${size}`, (err, result) => {
                if (err) throw err

                else {
                    res.send({
                        result,
                        numberOfResult
                    });
                }
            })

        }
    })

})


app.get('/', (req, res) => {
    res.send("surver is runnig");
})

app.listen(5000, () => {
    console.log("server running on port 5000");
})