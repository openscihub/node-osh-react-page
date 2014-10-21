var React = require('react');
var Page = require('osh-page');

var ReactPage = Page.extend({
  renderToDocument: function() {
    document.title = page.title;
  },

  run: function() {
    this.component = React.renderComponent(
      this.body,
      this.bodyElement
    );
  }
});

module.exports = ReactPage;
