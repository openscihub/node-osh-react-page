var ReactPage = require('./base');
var Page = require('osh-page');
var React = require('react');
var Class = require('osh-class');

function ui(page) {
  component = React.renderComponent(page.body, Page.body);
}

var BrowserReactPage = Class(ReactPage, function(opts) {
  opts.ui = ui;
  this._super(opts);
});

BrowserReactPage.prototype.render = function(page) {
  document.title = page.title;
};

module.exports = BrowserReactPage;
