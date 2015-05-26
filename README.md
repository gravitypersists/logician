# logician
A simple logical parser as an npm module 

## Usage

```

var solve = require('logician')

// solve basic logical operations

solve("true or false") // true
solve("true and false") // false

// solve numeric operations

solve("1 + 1 == 2") // true
solve("1 + 1 == 1 or true") // true
solve("1 != 2 and 2 != 1") // true
solve("4 < 5 and 7 >= 7") // true

```

Numerical operations: `+ - * / == != > < >= <=`

Logical operations: `or and is isnt not`

Synonyms: `== =` `or ||` `and &&` `not !`

It's worth noting that you should avoid confusing `==` with `is` as the former is a numerical comparison and the latter a logical comparisons.

See `test/main.js` for many more examples.

## Development

`npm install`

`gulp`