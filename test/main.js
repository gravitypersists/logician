var assert = require("assert")
var solve = require("../dist/logician.js")

describe('1 = 1', function(){
  it('should return true', function(){
    assert.equal(true, solve('1 = 1'));
  })
})