'use strict';

const express = require('express');
var cors = require('cors')
const database = require('./db_connection');
const app = express();

//Api
const taskMenager = require('./lib/api/task-menager')
const taskReader = require('./lib/api/task-reader')
app.use(cors())

app.use('/api', taskMenager);
app.use('/api', taskReader);

    

app.get('/', function(req, res) {
    console.log(database.readyState)
    res.send('Helslo World!')
});



app.listen(process.env.PORT, function() {
    console.log('Aplikacja ToDoPOL 2000, jest dostępna pod adresem localhost:8000. W trosce o.....');
    
});