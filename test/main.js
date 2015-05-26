var assert = require("assert")
var solve = require("../dist/logician.js")


function runTests(tests) {
  tests.forEach(function(test, i) {
    if (i % 2 != 0) return
    var truthiness = tests[i+1]
    describe('"'+test+'"', function(){
      it('should return ' + truthiness, function() {
        assert.equal(truthiness, solve(test));
      })
    })
  })
}

describe('Basic numeric equivalanece:', function() {

  runTests([
    "1 == 1", true,
    "1 == 2", false,
    "1 != 2", false,
  ])

})

describe('Ordered numeric operations:', function() {

  runTests([
    "3 < 6", true,
    "3 < 2", false,
    "4 > 2", true,
    "4 > 8", false,
    "4 >= 4", true,
    "4 >= 3", true,
    "4 >= 5", false,
    "4 <= 5", true,
    "4 <= 4", true,
  ])

})

describe('Basic logical operations:', function() {

  runTests([
    "true && true", true,
    "true && false", false,
  ])

})

describe('Order of operations:', function() {

  runTests([
    "1 + 2 == 3", true,
    "1 + 2 == 2", false,
    "not 1 == 2", true,
    "not 1 == 1", false,
    "1 + 2 <= 3", true,
    "1 + 2 < 3", false,
    "2 * 2 == 4", true,
    "2 * 4 == 4", false,
    "8 / 4 == 2", true,
    "8 / 4 == 4", false,
    "3 * 3 * 3 / 2 * 2 == 27", true,
    "3 + 7 * 2 * 11 == 157", true,
    "3 * 7 + 2 * 11 == 43", true,
    "3 * 7 * 2 + 11 == 53", true,
    "true && 1 == 1", true,
    "true && 2 == 1", false,
    "1 == 2 && 2 == 1", false,
    "1 + 1 == 2 && 2 == 1 + 1", true,
    "false || 1 == 1", true,
    "false || 1 == 2", false,
    "true && false || true", true,
    "true && !false", true,
    "true && !true", false,
    "1 == 1 && 2 == 2", true,
    "10 / 10 == 4 - 3 && 2 * 5 == 10", true,
    "10 / 10 == 4 - 4 && 2 * 5 == 10", false,
    "! 1 + 3 != 4", true
  ])

})

describe('Parenthesis:', function() {

  runTests([
    "true && !(1 == 2)", true,
    "true && !(1 == 1)", false,
    "true && (false || true)", true
  ])

})

describe('Logical equivalance vs numeric equivalance:', function() {

  runTests([
    "1 == 1 is 2 == 2", true,
    "1 == 1 is 2 == 3", false,
  ])

})

describe('Whitespace ignored:', function() {

  runTests([
    '   1   +   2  ==  3  ', true,
    '1   +   2  ==  3  ', true,
    '1   + 2  ==  3', true,
    '1   +  2 ==  3', true,
    '  1   + 2  ==  3', true,
    '  1  + 2  ==  2  ', false,
  ])

})

describe('Synonyms:', function() {

  runTests([

  ])

})

describe('Syntax errors:', function() {

})
