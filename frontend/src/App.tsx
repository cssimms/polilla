import { act, Component, useState } from "react";
import "./App.css";
import SpellingMoth from "./components/spelling-moth/spelling-moth";
import Profile from "./components/Profile";
import React from "react";

enum Games {
  SpellingMoth = "SPELLING_MOTH",
}

function App() {
  const [count, setCount] = useState(0);
  const [activeGame, setActiveGame] = useState<null | Games>(null);
  const [spellingMothOn, setSpellingMothOn] = useState(false);

  // TODO - initiate animation, we want a smooth transtion to playing the active game
  function launchGame(gameTitle: Games) {
    setActiveGame(gameTitle);
  }

  function getGameList() {
    return (
      <>
        <ol>
          <li>
            <p>Spelling Moth; try to find words using the middle letter</p>
            <button onClick={() => launchGame(Games.SpellingMoth)}>
              Open Spelling Moth
            </button>
          </li>
        </ol>
      </>
    );
  }

  const gameComponentMap: Map<Games, () => JSX.Element> = new Map();
  gameComponentMap.set(Games.SpellingMoth, SpellingMoth);

  function getPageContent() {
    if (activeGame) {
      const GameComponent = gameComponentMap.get(activeGame);
      // const ComponentToRender =

      return (
        <div className="active-game-container">
          <button
            className="close-game-button"
            onClick={() => setActiveGame(null)}
          >
            ~ Close Game ~
          </button>
          {GameComponent === undefined ? (
            <div>coult not find game</div>
          ) : (
            <GameComponent />
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
