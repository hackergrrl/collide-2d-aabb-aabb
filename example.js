var collideSet = require('./index').set

var boxes = [
  [18, 1, 1, 1],
  [0, 17, 10, 10],
  [0, 16, 1, 1]
]

var player = [0, 0, 16, 16]
var motion = [5, 100]

var offset = collideSet(player, motion, getAabbs, collideResponse)
console.log(offset)

function getAabbs (cb) {
  for (var i in boxes) {
    cb(boxes[i])
  }
  cb(null)
}

function collideResponse (box, axis, dir) {
  console.log('collideResponse', box, axis, dir)
}
