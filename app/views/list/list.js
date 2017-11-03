var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var page;

var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([
        { name: "ScottyRKeenanG" },
        { name: "BradBBScottyR" },
        { name: "DirtyPeteScottyR" }
    ])
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
  };
