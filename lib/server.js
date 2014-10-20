var React = require('react');
var Page = require('osh-page');

var ReactPage = Page.extend({
  renderToString: function() {
    this.body = React.renderComponentToString(this.body);
    return Page.prototype.renderToString.call(this);
  }
});

module.exports = ReactPage;
