global._ = require('underscore');
global.__ = require('lodash');

const restify = require('restify');
const config = require('./config');
const app = restify.createServer({ name: 'spotify-quetube-rest-api', version: '1.0.0' });
const db = require('./db');

global.globalConfig = config;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(restify.plugins.fullResponse());
app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

app.listen(config.port, () => {
  console.log('%s listening on port %s', app.name, config.port);
});

const routes = require('./routes')(app);
