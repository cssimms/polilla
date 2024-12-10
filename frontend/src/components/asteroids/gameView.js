var hotkeys = require("hotkeys-js/dist/hotkeys.common");

var GameView = function (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.intervalHandle;
};

GameView.prototype.start = function () {
  var that = this;
  that.bindKeyHandlers();
  that.intervalHandle = setInterval(function () {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

/* TODO - this stops the game from running and clears the screen, but doesn't
reset the state for the game at all. so asteroids are still missing and the ship
is in the same position, etc.
*/
GameView.prototype.stop = function () {
  // critical that games are consistent on this, or we're going to get
  // very strange collisions accross keybindings
  var that = this;
  clearInterval(that.intervalHandle);
  // setInterval returns non-0 number so this is a good way to know that
  // there is no current step interval
  that.intervalHandle = 0;
  that.releaseKeyHandlers();
  that.clearCanvas();
};

GameView.prototype.bindKeyHandlers = function () {
  const that = this;
  hotkeys("d", () => {
    console.log("blamo");
  });
  hotkeys("up", function (event) {
    that.game.ship.power(1);
  });
  hotkeys("down", function (event) {
    that.game.ship.power(-1);
  });
  hotkeys("left", function (event) {
    // 15 degree increments, will likely need tuning later
    that.game.ship.turn(-15);
  });
  hotkeys("right", function (event) {
    // 15 degree increments, will likely need tuning later
    that.game.ship.turn(15);
  });
};

GameView.prototype.releaseKeyHandlers = function () {
  hotkeys.unbind();
};

GameView.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  this.ctx.beginPath();
};
module.exports = GameView;
