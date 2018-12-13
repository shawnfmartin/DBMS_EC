const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const api = require('./src/routes/api');

let local_uri = 'mongodb://localhost/extracredit';
let heroku_uri = 'mongodb://heroku_5lxsd1jq:pla3gi3m3q1k802i95kquta9sq@ds135382.mlab.com:35382/heroku_5lxsd1jq';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connect = function (uri) {
    return mongoose.connect(uri, { useNewUrlParser: true });
};


connect(heroku_uri)
.then(() => {
    app.use('/api', api);

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

module.exports = connect;