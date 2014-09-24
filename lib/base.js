var React = require('react');
var Page = require('osh-page');
var Class = require('osh-class');
var extend = require('xtend');

var ClientError = React.createClass({
  render: function() {
    return React.DOM.div(null, 'Client error.');
  }
});

var ServerError = React.createClass({
  render: function() {
    return React.DOM.div(null, 'Server error.');
  }
});

var ReactPage = Class(Page, function(opts) {
  opts = extend({}, opts);
  opts['4xx'] = opts['4xx'] || ClientError;
  opts['5xx'] = opts['5xx'] || ServerError;
  this._super(opts);
});

module.exports = ReactPage;
