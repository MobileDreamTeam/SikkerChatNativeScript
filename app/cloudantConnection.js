var nano = require('nano')('https://18984aed-540c-42b0-ad6d-4b745c1cbf24-bluemix:20f132b06b751e60cfac0d27f736048da867bf8d9558325881303bcb34e5f90c@18984aed-540c-42b0-ad6d-4b745c1cbf24-bluemix.cloudant.com');
db = nano.db.use('tester');

var cloudAnt = {
  deleteConvo: function(convoName, docRevNum) {
    return new Promise((resolve, reject) => {
      db.destroy(convoName, docRevNum, function(err, body, header) {
        if (err) {
          console.log('ERROR DETECTED');
          reject('ERROR IN CLOUDANT');
        } else {
          console.log('worked so far');
          resolve(true);
        }
      });
    });
  },

  updateChat: function (message, chatName, messageBody) {
    var request = require('request');

    var options = { method: 'PUT',
      url: 'https://18984aed-540c-42b0-ad6d-4b745c1cbf24-bluemix:20f132b06b751e60cfac0d27f736048da867bf8d9558325881303bcb34e5f90c@18984aed-540c-42b0-ad6d-4b745c1cbf24-bluemix.cloudant.com/tester/updateTest',
      headers:
       { 'postman-token': '2de34c00-714f-eff5-1bee-090051eb28c8',
        'cache-control': 'no-cache',
        authorization: 'Basic MTg5ODRhZWQtNTQwYy00MmIwLWFkNmQtNGI3NDVjMWNiZjI0LWJsdWVtaXg6MjBmMTMyYjA2Yjc1MWU2MGNmYWMwZDI3ZjczNjA0OGRhODY3YmY4ZDk1NTgzMjU4ODEzMDNiY2IzNGU1ZjkwYw=='},
      body: '{\t"_id": "updateTest",\n\t"_rev": "3-5031c25c2497faba1e6dba06a3e707c7",\n    "messages": {\n   "0": "SexyKeenan: Hey baby, you come here often?",\n   "1": "ScottyR: Oh my... I need you",\n   "2": "ScottyR: Test"\n   \n    }\n}'};

    request(options, function( error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

  },
};

cloudAnt.deleteConvo('additionTest2', '1-15f2c2a9f785aceef98995f11a85ca1d');
