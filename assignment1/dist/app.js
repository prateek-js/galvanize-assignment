//app.js
const express = require('express');
const xss = require('./middleware/xss');
var cors = require('cors');
var bodyParser = require('body-parser');
require('express-async-errors');
const app = express();
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());
app.use(cors());
app.use(xss);
require('./startup/routes')(app);
module.exports = app;
//# sourceMappingURL=app.js.map