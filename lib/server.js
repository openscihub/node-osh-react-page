var React = require('react');

var ReactPage = {
  renderToString: function() {
    this.body = React.renderComponentToString(this.body);
    return Page.prototype.renderToString.call(this);
  }
};

module.exports = ReactPage;
