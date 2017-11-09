/*  MESSAGES ARRAY:
    {"0": "SexyKeenan: Hey baby, you come here often?",
    "1": "ScottyR: Oh my... I need you",
    "2": "ScottyR: Test"}
*/

//var A = ['SexyKeenan: Hey baby, you come here often?',
//'ScottyR: Oh my... I need you', 'ScottyR: Test'];

var dialogsModule = require('ui/dialogs');
var observableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var frameModule = require('ui/frame');
var page;

var pageData = new observableModule.fromObject({
  messages: new ObservableArray([
      'Hey baby, you come here often?',

      'Oh my... I need you',

      'Test',
    ]),
});

exports.loaded = function (args) {
  page = args.object;
  page.bindingContext = pageData;
};
