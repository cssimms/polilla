var Util = require('./util.js');
var MovingObject = require('./movingObject.js');
var Ship = require('./ship.js');

var Asteroid = function(game, position){
  this.COLOR = "#ff0000";
  this.RADIUS = Math.floor((Math.random() * 30) + 5);
  var vel = Util.randomVec(8);
  MovingObject.call(this, {"game": game,
                    "pos": position,
                    "vel": vel,
                    radius: this.RADIUS,
                    color: this.COLOR});
};

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;

Asteroid.prototype.collideWith = function (otherObject) {
  if(otherObject instanceof Ship){
    otherObject.relocate();
    this.game.remove(this);
  }
};
