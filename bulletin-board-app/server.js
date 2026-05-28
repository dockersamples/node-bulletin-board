var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    client         = require('prom-client'),
    routes         = require('./backend'),
    api            = require('./backend/api');

var app = module.exports = express();
var register = new client.Registry();

client.collectDefaultMetrics({ register: register });

var httpRequestsTotal = new client.Counter({
  name: 'bulletin_board_http_requests_total',
  help: 'Total number of HTTP requests processed',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

var httpRequestDurationSeconds = new client.Histogram({
  name: 'bulletin_board_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [register]
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function (req, res, next) {
  var end = httpRequestDurationSeconds.startTimer();

  res.on('finish', function () {
    var route = req.route && req.route.path ? req.route.path : req.path;

    httpRequestsTotal.labels(req.method, route, String(res.statusCode)).inc();
    end({ method: req.method, route: route, status: String(res.statusCode) });
  });

  next();
});

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

app.get('/', routes.index);
app.get('/api/events', api.events);
app.post('/api/events', api.event);
app.delete('/api/events/:eventId', api.event);
app.get('/health', function (req, res) {
  res.json({ status: 'ok' });
});
app.get('/metrics', function (req, res) {
  register.metrics().then(function (metrics) {
    res.set('Content-Type', register.contentType);
    res.end(metrics);
  });
});

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Magic happens on port ' + port + '...');
