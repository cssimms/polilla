import { useState } from "react";
import "./App.css";
import Game from "./Game.tsx";

/**
 * MVP done
 * - get set of 7 random letters, with one being the center
 * - guesses should be validated for:
 *   - length
 *   - containing center
 *   - valid word
 * - invalid guesses show result for some amount of time
 * - guesses should be stored and displayed at the top
 * - each word contributes to the score
 * - three buttons, delect, shuffle, enter are functional
 * - style to look roughly like the app
 */
export default function SpellingMoth() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <>
      <h1>Spelling Moth</h1>
      <div className="card">
        <button
          id="start-button"
          onClick={() => setIsStarted((isStarted) => !isStarted)}
        >
          {isStarted ? "Stop Game" : "Start Game"}
        </button>
        <div className="card">
          {isStarted ? <Game /> : <p>Click 'Start Game' to begin</p>}
        </div>
      </div>
      <p className="read-the-docs">
        Placeholder explainer text, I like this CSS class
      </p>
    </>
  );
}
