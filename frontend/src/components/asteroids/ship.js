var Util = require("./util.js");
var CONSTANTS = require("./constants.js");
var MovingObject = require("./movingObject.js");

var Ship = function (game) {
  this.RADIUS = CONSTANTS.DEFAULT_SHIP_RADIUS;
  this.COLOR = CONSTANTS.DEFAULT_SHIP_COLOR;
  // degrees of rotation from RIGHT, going clockwise (trig standard)
  this.direction = CONSTANTS.DEFAULT_SHIP_DIRECTION;
  MovingObject.call(this, {
    game: game,
    pos: CONSTANTS.DEFAULT_SHIP_POS,
    vel: [0, 0],
    radius: this.RADIUS,
    color: this.COLOR,
  });
};

Util.inherits(Ship, MovingObject);

// Fun little pattern found on StackOverflow, we're using an IIFE to wrap
// a closure around the parent method, and redefining the method on the
// Ship class. aka Monkey Patching without ES6 proxies
Ship.prototype.draw = (function (parentFunction) {
  return function (ctx) {
    console.log("drawing the ship");
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);

    // TODO - 50 is just a factor here that we'll want to mess w later
    var xYDeltas = Util.deltaXYFromDirection(this.direction, 50);
    ctx.lineTo(this.pos[0] + xYDeltas[0], this.pos[1] + xYDeltas[1]);
    ctx.strokeStyle = "#FFAD00";
    ctx.stroke();

    return parentFunction.apply(this, arguments);
  };
})(MovingObject.prototype.draw);

Ship.prototype.relocate = function () {
  console.log(this);
  this.pos = this.game.randoPo();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  console.log("ship power!");
  // bit of a temporary measure - calculating the change in velocity
  // using basic trig, see Util::delatXYFromDirection
  const deltas = Util.deltaXYFromDirection(this.direction);

  // multipling impulse here is kind of assuming it will always be 1 or -1
  // doesn't make the most sense but just wanted to get driection working
  // maybe we can design this function better later
  this.vel[0] = this.vel[0] + deltas[0] * impulse;
  this.vel[1] = this.vel[1] + deltas[1] * impulse;
  console.log("vel after adjustment", this.vel);
};

// TODO definitely need some error handling here..
Ship.prototype.turn = function (degrees) {
  this.direction += degrees;
};

module.exports = Ship;
