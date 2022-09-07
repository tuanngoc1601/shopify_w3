const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();

app.use(cors());
app.use(koaBody());


let devices = require('./devices.js');
let logs = require('./logs.js');

app.use(devices.routes());
app.use(logs.routes());

app.listen(5000);