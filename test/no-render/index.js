var React = require('react');
var ReactPage = require('../..');
var dom = React.DOM;

// Sometimes you want a subpage to control rendering of its parent
// page, such as when a subpage draws over the top of its parent.
// Other times, you want the parent to 

// A page should have a clear, consistent behavior described by
// the props given to it. Those props are ONLY url parameters and
// JSON data.
// 

//  1. Visit a new page
//  2. Find common ancestor in new/old page stacks
//  3. Download data for pages above common ancestor.
//  3. Starting from top of stack:
//    a. Render (sub)page.
//    b. Pass to parent.
//    c. Move to parent if not BELOW common ancestor and go to a.
//    d. Otherwise, mount rendered subpage.
//
//  or
//
//  1. Visit new page.
//  2. Download all data (uses browser cache for common shit).
//  3. No Page hierarchy, just path and data hierarchies. Render
//     page.

var Nav = React.createClass({
  render: function() {
    console.log('rendering nav');
    return dom.div(null, 'some kinda nav thing');
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  }
});

var NavPage = React.createClass({
  render: function() {
    return dom.div(null,
      Nav(),
      this.props.children
    );
  }
});

var LocationAndGo = React.createClass({
  go: function() {
    this.props.go.page.visit();
  },
  render: function() {
    return dom.div(null,
      dom.h1(null, this.props.location),
      dom.div(
        {onClick: this.go},
        'go to ' + this.props.go.name
      )
    );
  }
});


var page1, page2;

page1 = ReactPage({
  title: 'Page 1',
  path: {
    pattern: '/1'
  },
  body: function(props) {
    return NavPage(null,
      LocationAndGo({
        location: 'Page 1',
        go: {
          name: 'page 2',
          page: page2
        }
      })
    );
    //componentDidMount: function() {
    //  page2.visit();
    //}
  }
});

page2 = ReactPage({
  title: 'Page 2',
  path: {
    pattern: '/2'
  },
  body: function(props) {
    return NavPage(null,
      LocationAndGo({
        location: 'Page 2',
        go: {
          name: 'page 1',
          page: page1
        }
      })
    );
  }
});

module.exports = [
  page1,
  page2
];
