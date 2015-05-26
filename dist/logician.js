'use strict';

var operators = {

  // Num, Num -> Num
  '+': {
    'precedence': 20,
    'func': function func(a, b) {
      return parseFloat(a) + parseFloat(b);
    }
  },
  '-': {
    'precedence': 20,
    'func': function func(a, b) {
      return parseFloat(a) - parseFloat(b);
    }
  },
  '*': {
    'precedence': 21,
    'func': function func(a, b) {
      return parseFloat(a) * parseFloat(b);
    }
  },
  '/': {
    'precedence': 21,
    'func': function func(a, b) {
      return parseFloat(a) / parseFloat(b);
    }
  },

  // a, a -> Bool
  '==': {
    'precedence': 10,
    'func': function func(a, b) {
      if (typeof a === 'number' || typeof b === 'number') {
        return parseFloat(a) === parseFloat(b);
      } else {
        return a === b;
      }
    }
  },
  '!=': {
    'precedence': 10,
    'func': function func(a, b) {
      if (typeof a === 'number' || typeof b === 'number') {
        return parseFloat(a) !== parseFloat(b);
      } else {
        return a !== b;
      }
    }
  },

  // Ordered, Ordered -> Bool
  '>': {
    'precedence': 11,
    'func': function func(a, b) {
      return a > b;
    }
  },
  '<': {
    'precedence': 11,
    'func': function func(a, b) {
      return a < b;
    }
  },
  '>=': {
    'precedence': 11,
    'func': function func(a, b) {
      return a >= b;
    }
  },
  '<=': {
    'precedence': 11,
    'func': function func(a, b) {
      return a <= b;
    }
  },

  // Bool -> Bool
  'not': {
    'precedence': 5,
    'func': function func(a) {
      return !toBool(a);
    },
    'n': 1
  },

  // Bool, Bool -> Bool
  'or': {
    'precedence': 1,
    'func': function func(a, b) {
      return toBool(a) || toBool(b);
    }
  },
  'and': {
    'precedence': 2,
    'func': function func(a, b) {
      return toBool(a) && toBool(b);
    }
  },
  'is': {
    'precedence': 3,
    'func': function func(a, b) {
      return toBool(a) === toBool(b);
    }
  },
  'isnt': {
    'precedence': 3,
    'func': function func(a, b) {
      return toBool(a) !== toBool(b);
    }
  }
};

// synonyms
operators['='] = operators['=='];
operators['&&'] = operators['and'];
operators['||'] = operators['or'];
operators['!'] = operators['not'];

function toBool(a) {
  if (a === 'true') return true;
  if (a === 'false') return false;
  return a;
}

// add whitespace to '(', ')', and '!' operators so that
// "(a + !b)" -> "( a + ! b )"
function addSpaces(string) {
  var split = string.split('');
  var characters = split.map(function (character, i) {
    if (character == '(' || character == ')') {
      if (split[i - 1] != ' ') character = ' ' + character;
      if (split[i + 1] != ' ') character = character + ' ';
    }
    if (character == '!') {
      if (split[i + 1] != ' ' && split[i + 1] != '=') {
        character = character + ' ';
      }
    }
    return character;
  });
  return characters.join('');
}

// removes leading and trailing whitespace. Also groups
// of whitespace are trimmed down to one space.
// " a  +   b  == c  " -> "a + b == c"
function trim(string) {
  return string.replace(/\s+/g, ' ').replace(/\s+$/, '').replace(/^\s+/, '');
}

// Uses the shunting-yard algorithm to convert infix notation
// into Reverse Polish Notation
function convertToRPN(exp) {
  var stack = [];
  var rpn = [];
  var invalid = false;
  exp.split(' ').forEach(function (token) {
    if (operators[token]) {
      // This assumes no right-associative operators
      while (stack[stack.length - 1] && operators[stack[stack.length - 1]] && operators[token].precedence <= operators[stack[stack.length - 1]].precedence) {
        rpn.push(stack.pop());
      }
      stack.push(token);
    } else if (token == '(') {
      stack.push(token);
    } else if (token == ')') {
      while (stack.length && stack[stack.length - 1] != '(') {
        rpn.push(stack.pop());
      }
      if (stack[stack.length - 1] == '(') {
        stack.pop();
      } else {
        invalid = true;
      }
    } else {
      rpn.push(token);
    }
  });
  if (stack.indexOf('(') > -1 || stack.indexOf(')') > -1) {
    invalid = true;
  }
  if (invalid) {
    // throw error? I hate that. It halts all.
    console.error('Invalid expression ', exp);
  }
  return rpn.concat(stack.reverse());
}

function calculateRPN(rpn) {
  var stack = [];
  rpn.forEach(function (token) {
    var operator = operators[token];
    if (operator) {
      var numArgs = operator.n || 2;
      var args = [];
      for (var i = 1; i <= numArgs; i++) {
        args.push(stack.pop());
      }
      stack.push(operator.func.apply(null, args.reverse()));
    } else {
      stack.push(token);
    }
  });
  if (stack.length != 1) {
    console.error('Invalid rpn ', rpn);
  } else {
    return stack[0];
  }
}

function solve(expression) {
  return calculateRPN(convertToRPN(trim(addSpaces(expression))));
}

module.exports = solve;