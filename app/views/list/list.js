var dialogsModule = require('ui/dialogs');
var observableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var frameModule = require('ui/frame');
var page;

//Temporary fills for the list of user names
var pageData = new observableModule.fromObject({
  people: new ObservableArray([
      'ScottyRKeenanG',

      'BradBBScottyR',

      'DirtyPeteScottyR',

      'Test',
    ]),
});

//Links to chat Screen
exports.convo = function (args) {
  var topmost = frameModule.topmost();
  topmost.navigate('views/chat/chat');
};

//Loads shared data (user names)
exports.loaded = function (args) {
  page = args.object;
  page.bindingContext = pageData;
};
