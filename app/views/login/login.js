var frameModule = require('ui/frame');

<<<<<<< HEAD
exports.loaded = function () {
  console.log('hello');
};
=======
exports.loaded = function() {
    console.log('hello');
  };
>>>>>>> cc4cb9625cf267011cc5e4b008cfc411b28015d6

exports.signIn = function () {
  var topmost = frameModule.topmost();
  topmost.navigate('views/list/list');

  //alert("Signing in");
};

exports.register = function () {
<<<<<<< HEAD
  alert('Registering');
};
=======
    alert('Registering');
  };
>>>>>>> cc4cb9625cf267011cc5e4b008cfc411b28015d6

/*
action bar code
<ActionBar title="SikkerChat">
<ActionItem tap="onDelete"
    ios.systemIcon="16" ios.position="right"
    text="delete" android.position="popup"/>
</ActionBar>
*/
