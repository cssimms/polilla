import { useState } from "react";
import "./App.css";
import SpellingMoth from "./components/spelling-moth/SpellingMoth";
import Asteroids from "./components/asteroids/Asteroids";
import Profile from "./components/Profile";

enum GameNames {
  SpellingMoth = "SPELLING_MOTH",
  Asteroids = "ASTEROIDS",
}

interface GameData {
  name: GameNames;
  Component: () => JSX.Element;
  title: string;
  description: string;
}

const GAME_MAP: Map<GameNames, GameData> = new Map();
GAME_MAP.set(GameNames.SpellingMoth, {
  name: GameNames.SpellingMoth,
  Component: SpellingMoth,
  title: "Spelling Moth",
  description:
    "My version of the popular NY Times word game, Spelling Bee. Built to be simple and cute, currently has a small usable dictionary.",
});

GAME_MAP.set(GameNames.Asteroids, {
  name: GameNames.Asteroids,
  Component: Asteroids,
  title: "Asteroids",
  description:
    "Implementation of Asteroids built using jQuery and Canvas, this is a version of one of my first projects in Javascript. I was quite charmed by the simple physics implemented with simple math - I hope you are too!",
});

function App() {
  const [activeGame, setActiveGame] = useState<null | GameNames>(null);

  // TODO - initiate animation, we want a smooth transtion to playing the active game
  function launchGame(gameTitle: GameNames) {
    setActiveGame(gameTitle);
  }

  function getGameList() {
    const gameList = Array.from(GAME_MAP.values()).map((gameData) => {
      const { name, title, description } = gameData;
      return (
        <li className="game-list-element">
          <p>{description}</p>
          <button onClick={() => launchGame(name)}>Open {title}</button>
        </li>
      );
    });

    return (
      <>
        <ol>{gameList}</ol>
      </>
    );
  }

  function getPageContent() {
    if (activeGame) {
      const { Component, title } = GAME_MAP.get(activeGame) ?? {};

      return (
        <div className="active-game-container">
          <button
            className="close-game-button"
            onClick={() => setActiveGame(null)}
          >
            ~ Close Game ~
          </button>
          {Component === undefined ? (
            <div>Could not find game: {title}</div>
          ) : (
            <Component />
          )}
        </div>
      );
    } else {
      return <div className="card">{getGameList()}</div>;
    }
  }

  return (
    <div className="app-container">
      <Profile />
      {getPageContent()}
    </div>
  );
}

export default App;
