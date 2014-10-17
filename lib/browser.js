var React = require('react');

var ReactPage = {
  renderToDocument: function() {
    document.title = page.title;
  },

  run: function() {
    this.component = React.renderComponent(
      this.bodyElement,
      this.body
    );
  }
};

module.exports = ReactPage;
