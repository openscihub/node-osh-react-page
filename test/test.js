var Path = require('osh-path');
var ReactPage = require('..');
var expect = require('expect.js');
var express = require('express');
var http = require('http');
var extend = require('xtend');
var Dynapack = require('dynapack');
var React = require('react');
var request = require('superagent');
var supertest = require('supertest');
var morgan = require('morgan');
var host = require('osh-test-host');
var dom = React.DOM;
var serveStatic = require('serve-static');

describe('ReactPage', function() {
  describe('serve()', function() {
    it('should serve a basic page', function(done) {
      var page = ReactPage({
        title: 'Hi',
        path: {pattern: '/'},
        body: React.createClass({
          render: function() {
            return React.DOM.div(null, 'body');
          }
        })
      });
      var app = express();
      app.use(morgan('combined'));
      page.serve(app);
      var request = supertest(app);
      request.get('/')
      .expect(200)
      .expect(new RegExp('<title>Hi</title>'))
      .expect(new RegExp('body</div>'), done);
      //.expect(new RegExp('body</div>'))
      //.end(function(err, res) {
      //  if (err) done(err);
      //  else {
      //    console.log(res.text);
      //    done();
      //  }
      //});
    });
  });

  describe('visit()', function() {
    var dir = __dirname + '/no-render';
    var pages = require(dir);
    var server;

    before(function(done) {
      var app = express();
      app.use(morgan('combined'));
      var packer = Dynapack(
        {main: dir + '/index.js'},
        {output: dir + '/bundles'}
      );
      packer.run(function() {
        packer.write(function(err, entryInfo) {
          pages.forEach(function(page) {
            page.serve({
              app: app,
              scripts: entryInfo.main
            });
          });
          app.use(serveStatic(dir + '/bundles'));
          server = http.createServer(app);
          server.listen(3333, done);
        });
      });
    });

    xit('should update React subtree', function(done) {
      this.timeout(0);
      process.on('SIGINT', function() {
        console.log('Stopping server...');
        server && server.close();
        done();
      });
    });
  });
});
