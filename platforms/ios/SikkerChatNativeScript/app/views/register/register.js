var frameModule = require('ui/frame');
var user;
var pass;

exports.loaded = function () {
    console.log('hello');
  };

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate('views/list/list');
  };
