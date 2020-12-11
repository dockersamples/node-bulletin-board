var events = require('./events.js');

exports.events = function (req, res) {
  console.log('Hello world!');
  res.json(events);
};

exports.event = function (req, res) {
  res.json(events[req.param.eventId]);
};
