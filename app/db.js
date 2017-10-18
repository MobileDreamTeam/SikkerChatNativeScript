var nano = require('nano')('http://localhost:5984');

var testDB = nano.db.use('chats');

function removeChat(docID, revisionID) {
  testDB.destroy(docID, revisionID, function (err, body) {
        if (!err) {
          console.log('DELETED THAT BITCH');} else {
          console.log('ERROR DB DOES NOT EXIST');
        }
      });
}

var da = {
  messages: {
    DirtyPete: 'Woah isnt this neat',
    ScottyR: 'SO neat',
  },
};

function addChat(data, chatName) {
  var uniqueID = chatName;
  testDB.insert(data, uniqueID, function(err, body) {
    if (!err) {
      console.log('added to database with id: ', uniqueID);
      return true;
    } else {console.log('ERROR DB ALREADY EXISTS WITH THAT NAME');}
  });
}

function getRevNum(chatName) {
  testDB.get('dirtyPeteScottyR', function(err, body) {
    if (!err) {
      console.log(body._rev);
      return body._rev;
    }
  });
}

function getMessages(chatName) {
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
}

function getMessageFrom(chatName, userName) {
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
  });}

function getChatInfo(chatName) {
  return new Promise((resolve, reject) => {
    testDB.get(chatName, function (err, body) {
      if (!err) {
        console.log('inside');
        var info = body;
        if (body) {resolve(body);} else {reject('FUCKED UP');}
      }

    });
  });
}

/*
  alice.insert({ _id: 'myid', _rev: '1-23202479633c2b380f79507a776743d5', happy: false }, function(err, body) {
    if (!err)
      console.log(body)
  })
*/
function jBuilder(jMess, newMess, userNamte) {
  //build your initial message

  //add it in

  //reverse it all

  return newSon;
}
function addMessage(chatName, mess, userName) {
  var rev = '';
  getChatInfo(chatName).then((data) => {
    rev = data._rev;
  });

  //builds the message as one new JSON object
  getMessages(chatName).then((data) => {
    var a = JSON.stringify(data);
    var b = a.replace('{', '');
    b = b.replace('}', '');

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

    testDB.insert({ _id: chatName, _rev: rev, messages: newJSON }, function (err, body) {
      if (!err) {
        //good to go
        console.log('change set');
      }
    });
  });
}

//removeChat('d38bcec8cdfe71cc0f52604f4f000ce5', '2-165cf56d3bd4d973599d08ae172209f9');
//addChat(da, 'dirtyPeteScottyR');
//getChatInfo('dirtyPeteScottyR').then((data) => {console.log(data._rev);});

//getMessageFrom('dirtyPeteScottyR', 'scottyR');
//getMessages('dirtyPeteScottyR');
addMessage('dirtyPeteScottyR', 'FUCK I THINK ITS WORKING', 'DirtyPete');
