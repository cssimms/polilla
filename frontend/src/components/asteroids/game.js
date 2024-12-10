var Asteroid = require("./asteroid.js");
var Ship = require("./ship.js");

var Game = function () {
  this.addAsteroids(Game.NUM_ASTEROIDS);
  this.ship = new Ship(this);
};

Game.DIM_X = 800;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 10;

Game.prototype.randoPo = function () {
  var x = Math.floor(Math.random() * Game.DIM_X);
  var y = Math.floor(Math.random() * Game.DIM_Y);
  return [x, y];
};

Game.prototype.allObjects = function () {
  var allObjs = this.asteroids.slice();
  allObjs.push(this.ship);
  return allObjs;
};

Game.prototype.checkCollisions = function () {
  var that = this;
  that.allObjects().forEach(function (spaceJunk) {
    for (var i = 0; i < that.allObjects().length - 1; i++) {
      var otherJunk = that.allObjects()[i];
      if (spaceJunk.isCollidedWith(otherJunk) && spaceJunk !== otherJunk) {
        spaceJunk.collideWith(otherJunk);
        otherJunk.collideWith(spaceJunk);
      }
    }
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid) {
  var getRidOfThisOne = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(getRidOfThisOne, 1);
};

Game.prototype.wrap = function (pos) {
  var x = pos[0];
  var y = pos[1];
  if (x > Game.DIM_X) {
    x -= Game.DIM_X;
  } else if (x < 0) {
    x += Game.DIM_X;
  }
  if (y > Game.DIM_Y) {
    y -= Game.DIM_Y;
  } else if (y < 0) {
    y += Game.DIM_Y;
  }
  return [x, y];
};

Game.prototype.addAsteroids = function (num) {
  this.asteroids = [];
  var that = this;
  while (this.asteroids.length < num) {
    this.asteroids.push(new Asteroid(that, that.randoPo()));
  }
  return this.asteroids;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, 800, 800);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 800, 800);
  this.allObjects().forEach(function (spaceJunk) {
    spaceJunk.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (spaceJunk) {
    spaceJunk.move();
  });
};

module.exports = Game;
