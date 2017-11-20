var frameModule = require('ui/frame');

//Loads the page
exports.loaded = function() {
    console.log('hello');
  };

//User Signs in
exports.signIn = function() {
  var topmost = frameModule.topmost();
  topmost.navigate('views/list/list');
};

//Allows new users to register
exports.register = function () {
    alert('Registering');
  };
