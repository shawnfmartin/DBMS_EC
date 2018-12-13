const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const api = require('./src/routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connect = function (database_name) {
    return mongoose.connect('mongodb://localhost/' + database_name, { useNewUrlParser: true });
};

let dbname = 'extracredit';

connect(dbname)
.then(() => {
    app.use('/api', api);

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = connect;