//all the mocha stuff will go here
var request = require('request'),
    expect = require('chai').expect;

    
describe("Person", function () {
    describe("Constructor", function () {
        var matt = new Person("Matt");
        it("should create a new object", function () {
            expect(typeof (User)).to.equal("object");
        });

        it("should have a name", function () {
            expect(User.name).to.not.be.empty;
        });
    });
});
//check out tdd-todo if need be
