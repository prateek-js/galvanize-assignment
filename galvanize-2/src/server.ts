require('dotenv').config();

const config = require('config');
const app1 = require('./app');
const port = config.get('PORT') || 8000;
const server = app1.listen(port, async function () {
  await require('./startup/db')();
  console.log(`started on ${port}`);
});
module.exports = server;
