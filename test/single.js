var collideSingle = require('../index').single
var test = require('tape')

test('single - 1 axis', function (t) {
  var offset

  // right
  offset = collideSingle([0, 0, 16, 16], [5, 100], [18, 1, 1, 1])
  t.deepEquals(offset, [2, 100])

  // left
  offset = collideSingle([0, 0, 16, 16], [-5, 100], [-10, -10, 7, 30])
  t.deepEquals(offset, [-3, 100])

  // top
  offset = collideSingle([50, 50, 1, 1], [0, -100], [0, -1, 100, 1])
  t.deepEquals(offset, [0, -50])

  // bottom
  offset = collideSingle([10, 10, 100, 100], [0, 100], [-100, 200, 200, 1])
  t.deepEquals(offset, [0, 90])

  t.end()
})


test('single - 2 axes', function (t) {
  var offset = collideSingle([0, 0, 16, 16], [-1, -1], [-10, -10, 10, 10])
  t.deepEquals(offset, [0, 0])

  t.end()
})
