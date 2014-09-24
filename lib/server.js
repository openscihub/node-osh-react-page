var ReactPage = require('./base');
var Page = require('osh-page');
var React = require('react');

ReactPage.prototype.render = function(page) {
  console.log(page.body);
  //page.body = React.renderComponentToString(page.body);
  console.log(React.renderComponentToString(page.body));
  page.body = React.renderComponentToString(page.body);
  return Page.prototype.render.call(this, page);
};

module.exports = ReactPage;
