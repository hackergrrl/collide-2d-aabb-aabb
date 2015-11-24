// TODO(sww): zero allocations! (out param?)
function single (box, motion, box2) {
  var newX = moveAxis(box, motion, box2, 0)
  var newY = moveAxis(box, motion, box2, 1)

  return [newX, newY]
}

// TODO(sww): zero allocations! (out param?)
// TODO(sww): only call cb() on each axis' winner (not ALL candidates)
function set (box, motion, getBox, cb) {
  var box2 = undefined
  var offset = [motion[0], motion[1]]

  function heresABox (box2) {
    if (box2 !== null) {
      var leading = motion[0] > 0 ? box[0] + box[2] : box[0]
      var newX = moveAxis(box, motion, box2, 0)
      if (newX !== leading + motion[0]) {
        cb(box2, 0, motion[0] > 0 ? 1 : -1)
      }
      if (motion[0] > 0) { offset[0] = Math.min(offset[0], newX) }
      else { offset[0] = Math.max(offset[0], newX) }

      var leading = motion[1] > 0 ? box[1] + box[3] : box[1]
      var newY = moveAxis(box, motion, box2, 1)
      if (newY !== leading + motion[1]) {
        cb(box2, 1, motion[1] > 0 ? 1 : -1)
      }
      if (motion[1] > 0) { offset[1] = Math.min(offset[1], newY) }
      else { offset[1] = Math.max(offset[1], newY) }
    }
  }

  getBox(heresABox)

  return offset
}

function moveAxis (box, motion, box2, axis) {
  var leading = motion[axis] > 0 ? box[axis] + box[axis + 2] : box[axis]
  var otherAxis = (axis === 0 ? 1 : 0)

  // Bail if there's no other-axis intersection
  if (box[otherAxis] > box2[otherAxis] + box2[otherAxis + 2]) {
    return motion[axis]
  }
  if (box[otherAxis] + box[otherAxis + 2] < box2[otherAxis]) {
    return motion[axis]
  }
 
  // Axis hit (right/bottom)
  if (leading <= box2[axis] && leading + motion[axis] > box2[axis]) {
    return box2[axis] - leading
  }
 
  // Axis hit (left/top)
  if (leading >= box2[axis] + box2[axis + 2] && leading + motion[axis] < box2[axis] + box2[axis + 2]) {
    return (box2[axis] + box2[axis + 2]) - leading
  }

  return motion[axis]
}

module.exports.single = single
module.exports.set = set
