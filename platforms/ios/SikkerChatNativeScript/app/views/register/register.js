var frameModule = require('ui/frame');
var db = require('./db.js');
var user;
var pass;

exports.loaded = function () {
    console.log('hello');
  };

exports.register = function () {
    var topmost = frameModule.topmost();
    db.addUser(user, pass);
    topmost.navigate('views/list/list');
  };
