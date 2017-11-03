var frameModule = require('ui/frame');

exports.loaded = function () {
    console.log('hello');
  };

exports.signIn = function () {
  var topmost = frameModule.topmost();
  topmost.navigate('views/list/list');

  //alert("Signing in");
};

exports.register = function () {
    alert('Registering');
  };

/*
action bar code
<ActionBar title="SikkerChat">
<ActionItem tap="onDelete"
    ios.systemIcon="16" ios.position="right"
    text="delete" android.position="popup"/>
</ActionBar>
*/
