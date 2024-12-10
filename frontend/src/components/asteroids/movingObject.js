var Util = require("./util.js");

var MovingObject = function (args) {
  this.game = args["game"];
  this.pos = args["pos"];
  this.vel = args["vel"];
  this.radius = args["radius"];
  this.color = args["color"];
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

  ctx.fill();

  // uncomment sometime, really cool to see lines projecting from each
  // object to a central point... maybe a basis for some other geometry
  // games... what was that one with weird line art??
  // ctx.beginPath();
  // ctx.moveTo(this.pos[0], this.pos[1]);
  // ctx.strokeStyle = "#FFAD00";
  // ctx.lineTo(500, 500);
  // ctx.stroke();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.collideWith = function (otherObject) {
  // this.game.remove(otherObject);
  // this.game.remove(this);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var xDiff = this.pos[0] - otherObject.pos[0];
  var yDiff = this.pos[1] - otherObject.pos[1];
  var radii = this.radius + otherObject.radius;
  var distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if (distance < radii) {
    return true;
  }
  return false;
};

module.exports = MovingObject;
