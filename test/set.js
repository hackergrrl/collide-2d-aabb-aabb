var collideSet = require('../index').set
var test = require('tape')

test('set - basic', function (t) {
  t.plan(3)

  var boxes = [
    [18, 1, 1, 1],
    [0, 17, 10, 10]
  ]

  var player = [0, 0, 16, 16]
  var motion = [5, 100]

  var offset = collideSet(player, motion, getAabbs, collideResponse)
  t.deepEquals(offset, [2, 1])

  function getAabbs (cb) {
    for (var i in boxes) {
      cb(boxes[i])
    }
    cb(null)
  }

  var i=0
  function collideResponse (box, axis, dir) {
    if (axis === 0) t.equals(box, boxes[0])
    if (axis === 1) t.equals(box, boxes[1])
  }
})

test('set - (+) multiple candidates', function (t) {
  t.plan(4)

  var boxes = [
    [18, 1, 1, 1],
    [20, 1, 1, 1],
    [25, 1, 1, 1]
  ]

  var player = [0, 0, 16, 16]
  var motion = [50, 0]

  var offset = collideSet(player, motion, getAabbs, collideResponse)
  t.deepEquals(offset, [2, 0])

  function getAabbs (cb) {
    for (var i in boxes) {
      cb(boxes[i])
    }
    cb(null)
  }

  function collideResponse (box, axis, dir) {
    t.equals(axis, 0)
    t.equals(dir, 1)
    t.equals(box, boxes[0])
  }
})

test('set - (-) multiple candidates', function (t) {
  t.plan(4)

  var boxes = [
    [0, -18, 1, 1],
    [0, -20, 1, 1],
    [0, -25, 1, 1]
  ]

  var player = [0, 0, 16, 16]
  var motion = [0, -100]

  var offset = collideSet(player, motion, getAabbs, collideResponse)
  t.deepEquals(offset, [0, -17])

  function getAabbs (cb) {
    for (var i in boxes) {
      cb(boxes[i])
    }
    cb(null)
  }

  function collideResponse (box, axis, dir) {
    t.equals(axis, 1)
    t.equals(dir, -1)
    t.equals(box, boxes[0])
  }
})
