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
  testDB.insert(data, uniqueID, function (err, body) {
    if (!err) {
      console.log('added to database with id: ', uniqueID);
      return true;
    } else {console.log('ERROR DB ALREADY EXISTS WITH THAT NAME');}
  });
}

function getRevNum(chatName) {
  testDB.get('dirtyPeteScottyR', function (err, body) {
    if (!err) {
      console.log(body._rev);
      return body._rev;
    }
  });
}

function getMessageFrom(chatName, userName) {
  testDB.get(chatName, function (err, body) {
    if (!err) {
      console.log(body.messages[userName]);
      var messageFrom = body.messages[userName];
      if (messageFrom) {
        return messageFrom;
      } else {
        console.log('User not found, check spelling');
      }
    } else {console.log('ERROR');}
  });
}

//removeChat('d38bcec8cdfe71cc0f52604f4f000ce5', '2-165cf56d3bd4d973599d08ae172209f9');
//addChat(da, 'dirtyPeteScottyR');
//getChatInfo('dirtyPeteScottyR');
getMessageFrom('dirtyPeteScottyR', 'scottyR');
