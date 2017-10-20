var nano = require('nano')('http://localhost:5984');

var testDB = nano.db.use('chats');

let db = {
  removeChat: function(docID, revisionID) {
    testDB.destroy(docID, revisionID, function (err, body) {
          if (!err) {
            console.log('DELETED THAT BITCH');} else {
            console.log('ERROR DB DOES NOT EXIST');
          }
        });
  },

  getUsers: function(docID) {
    return new Promise((resolve, reject) => {
      testDB.get(docID, function(err, body) {
        if(!err) {
          var messageBody = body.users;
          console.log(messageBody);
          resolve(messageBody);
        } else {reject('DIDNT WORK');}
      });
    });

  },

  addUser: function (user, password) {
    let id = 'userTest';
    let revID = '';
    this.getChatInfo(id).then((data) =>
      revID = data._rev);
    this.getUsers(id).then((data) => {
      let usersNow = data;
      usersNow[user] = password;
      testDB.insert({ _id: id, _rev: revID, users: [usersNow] }, function (err, body) {
        if (!err) {
          console.log('User ' + user + ' has been added successfully');
        }
      });
    });
  },

  //adds a chat to the Database

  addChat: function(data, chatName) {
    var uniqueID = chatName;
    testDB.insert(data, uniqueID, function(err, body) {
      if (!err) {
        console.log('added to database with id: ', uniqueID);
        return true;
      } else {console.log('ERROR DB ALREADY EXISTS WITH THAT NAME');}
    });
  },

  //gets the reversion number for internal use
  getRevNum: function(chatName) {
    testDB.get('dirtyPeteScottyR', function(err, body) {
      if (!err) {
        console.log(body._rev);
        return body._rev;
      }
    });
  },

  //gets the messages in the chat database given the name
  getMessages: function(chatName) {
    return new Promise((resolve, reject) => {
      testDB.get(chatName, function(err, body) {
        if (!err) {
          //console.log(body.messages);
          var messageBody = body.messages;
          if (messageBody) {
            resolve(messageBody);
          } else {
            //console.log('No messages to retreive, check spelling');
          }
        } else {reject('ERROR');}
      });});
  },

  //gets message from that user
 getMessageFrom: function(chatName, userName) {
    return new Promise((resolve, reject) => {
      testDB.get(chatName, function(err, body) {
        if (!err) {
          //console.log(body.messages[userName]);
          var messageFrom = body.messages[userName];
          if (messageFrom) {
            resolve(messageFrom);
          } else {
            reject('User not found, check spelling');
          }
        } else {console.log('ERROR');}
      });
    });},

  //returns information about the chats
  getChatInfo: function (chatName) {
    return new Promise((resolve, reject) => {
      testDB.get(chatName, function (err, body) {
        if (!err) {
          console.log('inside');
          var info = body;
          if (body) {resolve(body);} else {reject('FUCKED UP');}
        }

      });
    });
  },

  /*
    alice.insert({ _id: 'myid', _rev: '1-23202479633c2b380f79507a776743d5', happy: false }, function(err, body) {
      if (!err)
        console.log(body)
    })
  */

  //function that adds message to the database, keep in mind. Doesn't actually
  //add message, just replaces old string to new

  addMessage: function (chatName, mess) {
    return new Promise((resolve, reject)=> {
      var rev = '';
      this.getChatInfo(chatName).then((data) => {
        rev = data._rev;
      });

      //builds the message as one new JSON object
      this.getMessages(chatName).then((data) => {
        var a = JSON.stringify(data);
        var num = countObjectKeys(data);
        var b = a.replace('{', '');
        b = b.replace('}', '');
        var c = data;
        console.log('c is good so far');
        c[num] = mess;
        console.log('c is : ', c);
        /*
        //console.log('b is', b);
        var messArray = b.split(',');
        var createObj = '\"' + userName + '\"' + ':' + '\"' + mess + '\"';
        messArray.push(createObj);
        messArray.reverse();

        //console.log(messArray);
        var newJSON = '{';
        while (messArray.length > 0) {
          newJSON = newJSON + messArray.pop() + ',' + '\n';
        }

        newJSON = newJSON + '}';
*/
        testDB.insert({ _id: chatName, _rev: rev, messages: c }, function (err, body) {
          if (!err) {
            //good to go
            console.log('change set');
          }
        });
      });
    });
  },

  countObjectKeys: function (obj) {
      return Object.keys(obj).length;
    },

  //removeChat('d38bcec8cdfe71cc0f52604f4f000ce5', '2-165cf56d3bd4d973599d08ae172209f9');
  //removeChat('dirtyPeteScottyR', '21-df7a0837740c673026bbeaceb994aa76');
  //addChat(da, 'dirtyPeteScottyR');
  //getChatInfo('dirtyPeteScottyR').then((data) => {console.log(data._rev);});

  //getMessageFrom('dirtyPeteScottyR', 'scottyR');
  //getMessages('dirtyPeteScottyR');
  //addMessage('dirtyPeteScottyR', 'FUCK I THINK ITS WORKING', 'DirtyPete');

};
var da = {
  messages: {
    0: 'SexyKeenan: Hey baby, you come here often?',
    1: 'ScottyR: Oh my... I need you',
  },
};

var emptyData = { users: {
  test1: 'fakePassword',
}, };

//function for counting key values pairs
//written by Amiya Sahu
function countObjectKeys(obj) {
  return Object.keys(obj).length;
}

//db.addChat(da, 'sexyKeenanScottyR');

//db.removeChat('sexyKeenanScottyR', '17-4b030c7104458531e7c791f774d8866e');
//db.removeChat('userTest', '1-53feee047bfec6973bd2c08c06091972');
//db.addMessage('sexyKeenanScottyR', 'SexyKeenan: I\'ll be there soon baby');
//db.addChat(emptyData, 'userTest');

db.addUser('test3', 'password');
//db.getUsers('userTest');
module.exports = db;
