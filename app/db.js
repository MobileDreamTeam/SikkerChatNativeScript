var nano = require('nano')('https://18984aed-540c-42b0-ad6d-4b745c1cbf24-bluemix:20f132b06b751e60cfac0d27f736048da867bf8d9558325881303bcb34e5f90c@18984aed-540c-42b0-ad6d-4b745c1cbf24-bluemix.cloudant.com');
testDB = nano.db.use('tester');

//Test if Database can be found
let cloudAnt = {
  removeChat: function(docID, revisionID) {
    testDB.destroy(docID, revisionID, function (err, body) {
          if (!err) {
            console.log('DELETED THAT BITCH');} else {
            console.log('ERROR DB DOES NOT EXIST');
          }
        });
  },

  //Gets user information from the Database
  getUsers: function (docID) {
    return new Promise((resolve, reject) => {
      testDB.get(docID, function(err, body) {
        if(!err) {
          var messageBody = body.users;
          console.log('body is ', body);
          //let u = 'test23';
          //messageBody[u] = 'hello';
          //console.log('userIs', body.users.test2);
          //console.log(messageBody);
          resolve(messageBody);
        } else {reject('DIDNT WORK');}
      });
    });

  },

  //Allows creation of new user and adds user to the database
  addUser: function (user, password) {
    let id = 'userTest';
    let revID = '';
    let u = user;
    this.getChatInfo(id).then((data) =>
      {revID = data._rev;});
    this.getUsers(id).then((data) => {
      let usersNow = data;
      usersNow[u] = password;
      console.log('users now is ', usersNow);
      testDB.insert({ _id: id, _rev: revID, users: usersNow }, function (err, body) {
        if (!err) {
          console.log('User ' + user + ' has been added successfully');
        }
      });
    });
  },

  //Adds a chat to the database
  addChat: function (data, chatName) {
    var uniqueID = chatName;
    testDB.insert(data, uniqueID, function (err, body) {
      //Check to make sure chat ID is unique within Database
      if (!err) {
        console.log('added to database with id: ', uniqueID);
        return true;
      } else {console.log('ERROR DB ALREADY EXISTS WITH THAT NAME');}
    });
  },

  //Grabs the reversion number for internal use
  getRevNum: function (chatName) {
    testDB.get('dirtyPeteScottyR', function (err, body) {
      if (!err) {
        console.log(body._rev);
        return body._rev;
      }
    });
  },

  //Grabs the messages in the chat database given the name
  getMessages: function (chatName) {
    return new Promise((resolve, reject) => {
      testDB.get(chatName, function (err, body) {
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

  //Gets message from that user
 getMessageFrom: function (chatName, userName) {
    return new Promise((resolve, reject) => {
      testDB.get(chatName, function(err, body) {
        if (!err) {
          //console.log(body.messages[userName]);
          var messageFrom = body.messages[userName];
          //Make sure username matches
          if (messageFrom) {
            resolve(messageFrom);
          } else {
            reject('User not found, check spelling');
          }
        } else {console.log('ERROR');}
      });
    });},

  //Returns information about the chats
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

  //Grabs all chats for any given user
  getChatsFromUser: function (userName) {
    var convoList = [];
    return new Promise((resolve, reject) => {
      //Get all the conversations
      testDB.list(function (err, body) {
        if (!err) {
          console.log(body.rows.length);
          for (i = 0; i < body.rows.length; i++) {
            //Get the convoName as a string
            var q = body.rows[i].id;
            s = JSON.stringify(q);
            if (q.includes(userName)) {
              convoList.push(q);
              console.log('match found', q);
            }
          }

          console.log(convoList);
          return convoList;
        }
      });

      //search each one, add it to a list and return that list out
    });
  },

  /*
    alice.insert({ _id: 'myid', _rev: '1-23202479633c2b380f79507a776743d5', happy: false }, function(err, body) {
      if (!err)
        console.log(body)
    })
  */

  //Adds new message to database, replaces old string with new
  addMessage: function (chatName, mess) {
    return new Promise((resolve, reject)=> {
      var rev = '';
      this.getChatInfo(chatName).then((data) => {
        rev = data._rev;
      });

      //Builds the message as one new JSON object
      this.getMessages(chatName).then((data) => {
        var a = JSON.stringify(data);
        var num = countObjectKeys(data);
        var b = a.replace('{', '');
        b = b.replace('}', '');
        var c = data;
        console.log('c is good so far');
        c[num] = mess;
        console.log('c is : ', c);
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
//Test Data
var da = {
  messages: {
    0: 'SexyKeenan: Hey baby, you come here often?',
    1: 'ScottyR: Oh my... I need you',
  },
};

var emptyData = { users: {
  test1: 'fakePassword',
}, };

//Function for counting key values pairs
//written by Amiya Sahu
function countObjectKeys(obj) {
  return Object.keys(obj).length;
}

//db.addChat(da, 'sexyKeenanScottyR');

//db.removeChat('sexyKeenanScottyR', '17-4b030c7104458531e7c791f774d8866e');
//db.removeChat('userTest', '13-55d7b812942255ea8e29250adb1cb5e8');
//db.addMessage('sexyKeenanScottyR', 'SexyKeenan: I\'ll be there soon baby');
//db.addChat(emptyData, 'userTest');

//db.addUser('test3', 'password');
//db.getUsers('userTest');
//cloudAnt.getChatsFromUser('Scott');
module.exports = cloudAnt;
