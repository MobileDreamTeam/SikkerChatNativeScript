const should = require('should');
const request = require('supertest');
const db = require('../db.js');
const sinon = require('sinon');

describe('Database', function () {
	describe('addChat()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});


//removeChat('d38bcec8cdfe71cc0f52604f4f000ce5', '2-165cf56d3bd4d973599d08ae172209f9');
//removeChat('dirtyPeteScottyR', '21-df7a0837740c673026bbeaceb994aa76');
var da = {
      messages: {
        DirtyPete: 'Woah isnt this neat',
        ScottyR: 'SO neat',
      },
    };

//addChat(da,'testChat');
//getChatInfo('dirtyPeteScottyR').then((data) => {console.log(data._rev);});

//getMessageFrom('dirtyPeteScottyR', 'scottyR');
//getMessages('dirtyPeteScottyR');
//addMessage('dirtyPeteScottyR', 'FUCK I THINK ITS WORKING', 'DirtyPete');
