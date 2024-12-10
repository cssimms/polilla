var Util = function () {};

Util.inherits = function (ChildClass, ParentClass) {
  var Surrogate = function () {};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Util.randomVec = function (length) {
  var isxNeg = Math.random() > 0.5 ? -1 : 1;
  var isyNeg = Math.random() > 0.5 ? -1 : 1;
  var dx = Math.floor(Math.random() * length + 1) * isxNeg;
  var dy = Math.floor(Math.random() * length + 1) * isyNeg;
  return [dx, dy];
};

/**
 * Calculates the change in x and y to apply to a velocity tuple
 * in order to affect in the given direction and magnitude
 * @param {number} theta - angle of direction, given in degrees
 * @param {number} magnitude - magnitude of change desired
 * @return {Array} array of the delta X and Y corrected for a JS canvas direction
 */

Util.deltaXYFromDirection = function (theta, magnitude) {
  var mag = magnitude ? magnitude : 1;
  // assumes the magnitude of vector should be 1
  // sin(theta) = y/z
  // cos(theta) = x/z
  const yDelta = Math.sin(Util.degreeToRadian(theta)) * mag;
  const xDelta = Math.cos(Util.degreeToRadian(theta)) * mag;
  return [xDelta, yDelta];
};

Util.degreeToRadian = function (degrees) {
  return (degrees * Math.PI) / 180;
};

module.exports = Util;
