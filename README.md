# logician
A simple logical parser as an npm module 

## Usage

`npm install logician`

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

## Yeah, but why?

It allows strings to be defined externally to an application and fed in to be computed at runtimes.

For instance, if you have an application defined by a number of configuration files, or defined by an authoring tool, you can allow authors to account for logical decisions without them writing code.

## Development

`npm install`

`gulp`