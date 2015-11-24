# collide-2d-aabb-aabb

> Determines whether a moving axis-aligned bounding box (AABB) collides with
> other AABBs.

`collide-2d-aabb-aabb` provides methods for testing against either a single AABB
or a set of them in 2D space.

## Installation

```
$ npm install collide-2d-aabb-aabb
```


## Example: Test vs Single AABB

```javascript
var collideSingle = require('collide-2d-aabb-aabb').single

var player = [0, 0, 16, 16]
var motion = [5, 5]
var crate = [18, 1, 32, 32]

var offset = collideSingle(player, motion, crate)
console.log(offset)
```

outputs

```
[2, 5]
```

## Example: Test vs Set of AABBs

```javascript
var collideSet = require('collide-2d-aabb-aabb').set

var player = [0, 0, 16, 16]
var motion = [5, 5]
var crates = [
  [18, 1, 32, 32]
  [7, 19, 32, 32]
]

function getCrate (cb) {
  cb(crates[0])
  cb(crates[1])
  cb(null)
}

var offset = collideSet(player, motion, getCrate, onCollide)
console.log(offset)

function onCollide (box, axis, dir) {
  console.log(box, axis, dir)
}
```

outputs

```
[18, 1, 32, 32], 0, 1
[7, 19, 32, 32], 1, 1
[2, 3]
```

Detection and correction is applied on each X and Y axis separately, resulting
in 0-2 calls to `onCollide`.


## Usage

```javascript
var single = require('collide-2d-aabb-aabb').single
var set = require('collide-2d-aabb-aabb').set
```

### var offset = single(aabb, moveDelta, aabb2)

Attempt to advance `aabb` by `moveDelta` against the impeding `aabb2`.
Non-destructive.

If there is no collision, `offset == moveDelta`. Otherwise, it will be shorter
in one or both axes.

`aabb` and `aabb2` are assumed to be a size 4 array of the form `[x, y, width,
height]`.

`moveDelta` is assumed to be a `gl-matrix`-style `vec2` or array `[x, y]`.


### var offset = set(aabb, moveDelta, getAabb, onCollide)

Attempt to advance `aabb` by `moveDelta` against the set of impeding AABBs
provided by the `getAabb` function. Non-destructive.

`getAabb` is assumed to be a function with a single parameter, `cb`, which is
called to give size 4 arrays (of the form `[x, y, width, height]`) to check
collisions against. You **must** call `cb(null)` to indicate `getAabb` is
finished providing values.

If there is no collision, `offset == moveDelta`. Otherwise, it will be shorter
in one or both axes.

`aabb` is assumed to be a size 4 array of the form `[x, y, width, height]`.

`moveDelta` is assumed to be a `gl-matrix`-style `vec2` or array `[x, y]`.

`onCollide` is a callback function, taking the following arguments:

* `aabb`: the size 4 array that the collision took place against. Will be === to
  the array provided by `getAabb`.
* `moveAxis`: an integer representing the axis of movement. `0` (X) or `1` (Y).
* `moveDir`: either -1 or 1, denoting the direction of the movement.


## License

MIT
