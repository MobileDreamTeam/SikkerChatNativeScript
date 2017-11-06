var dialogsModule = require('ui/dialogs');
var observableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var frameModule = require('ui/frame');
var page;

var pageData = new observableModule.fromObject({
  people: new ObservableArray([
      'ScottyRKeenanG',

      'BradBBScottyR',

      'DirtyPeteScottyR',

      'Test',
    ]),
});

exports.convo = function (args) {
  var topmost = frameModule.topmost();
  topmost.navigate('views/chat/chat');
};

exports.loaded = function (args) {
  page = args.object;
  page.bindingContext = pageData;
};
