var dialogsModule = require('ui/dialogs');
var observableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var frameModule = require('ui/frame');
var page;

//Array of messages, will be filled from Database
var pageData = new observableModule.fromObject({
  messages: new ObservableArray([
      'Hey baby, you come here often?',

      'Oh my... I need you',

      'Test',
    ]),
});

//Load in the page data
exports.loaded = function (args) {
  page = args.object;
  page.bindingContext = pageData;
};
