var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    prometheus     = require('prom-client'),
    routes         = require('./backend'),
    api            = require('./backend/api');

var app = module.exports = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use('/build', express.static('public'));

var env = process.env.NODE_ENV;
if ('development' == env) {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

// counter for Prometheus:
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]  // buckets for response time from 0.1ms to 500ms
})

// record timestamp before request handler:
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now()
  next()
})

app.get('/', routes.index);
app.get('/api/events', api.events);
app.post('/api/events', api.event);
app.delete('/api/events/:eventId', api.event);

app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType)
  res.end(prometheus.register.metrics())
})

// set response duration after handler:
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch

  httpRequestDurationMicroseconds
    .labels(req.method, req.path, res.statusCode)
    .observe(responseTimeInMs)

  next()
})

prometheus.collectDefaultMetrics();

app.listen(8080);
console.log('Magic happens on port 8080...');