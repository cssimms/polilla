var CONSTANTS = require("./constants.js");
var Game = require("./game.js");
var GameView = require("./gameView.js");

console.log("~~ Initializing Asteroids ~~");
var gameContainer = document.getElementById("asteroids-runner");
// var element = document.getElementById("game-canvas");
var canvasElement = document.createElement("canvas");
canvasElement.id = "game-canvas";
canvasElement.width = CONSTANTS.DEFAULT_GAME_WIDTH;
canvasElement.height = CONSTANTS.DEFAULT_GAME_HEIGHT;

gameContainer.appendChild(canvasElement);
var ctx = canvasElement.getContext("2d");

var newGame = new Game();
var newGameView = new GameView(newGame, ctx);

// On/Off functionality
var gameRunning = false;
var startButton = document.createElement("button");
startButton.id = "start-button";
startButton.innerText = "Start Asteroids!";
gameContainer.appendChild(startButton);

startButton.addEventListener("click", (event) => {
  console.log("-- Asteroids Button clicked! --");
  if (gameRunning) {
    gameRunning = false;
    newGameView.stop();
    startButton.innerText = "Start Asteroids!";
  } else {
    gameRunning = true;
    newGameView.start();
    startButton.innerText = "Stop Asteroids...";
  }
});
