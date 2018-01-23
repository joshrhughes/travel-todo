//all the mocha stuff will go here
var request = require('request'),
    expect = require('chai').expect;


let url = 'https://travel-todo.herokuapp.com/';

describe('Testing Server', function () {
    it('should respond with status 200/ok', function (done) {
        request(url, function (err, res, body) {
            expect(res.statusCode).to.eq(200);
            done();
        });
    });
});
