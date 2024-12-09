import { useEffect, useState } from "react";
import { ALL_LETTERS, DICTIONARY_WORDS } from "./dictionary.ts";
import Letters from "./Letters";
import GuessedWords from "./GuessedWords";

export default function Game() {
  const [score, setScore] = useState<number>(0);
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [letters, setLetters] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [centerLetter, setCenterLetter] = useState<string | undefined>(
    undefined
  );
  const [notification, setNotification] = useState<string | undefined>(
    undefined
  );

  // TODO - check if setting logic inside a conditional is "best practice"
  useEffect(() => {
    // get random letters, but only if we haven't already
    if (letters.length < 1) {
      const randomLetters = getRandomLetters();
      const randomCenter = getRandomLetter(randomLetters);
      const centerIndex = randomLetters.indexOf(randomCenter);
      const lettersWithoutCenter = removeElAtIndex(randomLetters, centerIndex);

      // for debuging only, set middle letter x4 as a valid word for testing
      DICTIONARY_WORDS.push(
        `${randomCenter}${randomCenter}${randomCenter}${randomCenter}`
      );

      console.log("Initialized with letters: ", randomLetters);
      console.log("Initialized with center letter as: ", randomCenter);

      // Set state for our generated letters
      setCenterLetter(randomCenter);
      setLetters(lettersWithoutCenter);
    }
  }, []);

  // Returns a copy of the given array, without the element at index
  function removeElAtIndex<T>(array: T[], indexToRemove: number): T[] {
    return array
      .slice(0, indexToRemove)
      .concat(array.slice(indexToRemove + 1, array.length));
  }

  function getRandomLetter(arrayOfLetters: string[]) {
    const randomIndex = Math.floor(Math.random() * arrayOfLetters.length);
    return arrayOfLetters[randomIndex];
  }

  // TODO - ensure there's always a vowel
  function getRandomLetters() {
    const MAX_LETTERS = 7;
    const lettersToAdd: string[] = [];
    for (let i = 0; i < MAX_LETTERS; i++) {
      let currentLetter = getRandomLetter(ALL_LETTERS);
      let attempt = 0;

      while (lettersToAdd.includes(currentLetter) && attempt < 100) {
        console.log(
          "Found duplicate letter while generating, retrying...",
          lettersToAdd,
          currentLetter
        );
        currentLetter = getRandomLetter(ALL_LETTERS);
        attempt++;
      }

      lettersToAdd.push(currentLetter);
    }
    return lettersToAdd;
  }

  function getScoreForWord(word: string): number {
    return word.length;
  }

  // This is kind of complicated, see design doc. We're going to skip for now.
  // function generateAllValidWords(letters: string[]) {
  // Need to ... store dictionary as a tree of letters.
  // with duplicate letters, this is pretty hard
  // without, we can brute force to focus on practicing react/ css?
  // Initialize game with target words
  // }

  function handleLetterClick(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = (event.target as HTMLInputElement).value;
    const newWord = currentWord + value;
    setCurrentWord(newWord);
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let wordCopy = currentWord.slice(0, -1);
    setCurrentWord(wordCopy);
  }

  function displayNotification(message: string | undefined) {
    setNotification(message);
    setTimeout(() => {
      setNotification(undefined);
    }, 2000);
  }

  function handleSubmitWord(event: React.MouseEvent<HTMLButtonElement>) {
    const TOO_SHORT = "Too short";
    const MISSING_CENTER = "Missing center letter";
    const NOT_A_WORD = "Not found in word list";
    event.preventDefault();

    if (!centerLetter || !currentWord) return;

    if (currentWord.length < 3) {
      displayNotification(TOO_SHORT);
    } else if (!currentWord.includes(centerLetter)) {
      displayNotification(MISSING_CENTER);
    } else if (!DICTIONARY_WORDS.includes(currentWord)) {
      displayNotification(NOT_A_WORD);
    } else {
      const newGuessedList = guessedWords.slice();
      newGuessedList.push(currentWord);
      const newScore = getScoreForWord(currentWord);
      setScore(newScore + score);
      setGuessedWords(newGuessedList);
    }

    setCurrentWord("");
  }

  function handleShuffle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const newLetters = [];
    let lettersToDistribute = letters.slice();
    let currentLetter = undefined;

    let attempts = 0;
    while (lettersToDistribute.length > 0 && attempts < 100) {
      // push in current
      currentLetter = getRandomLetter(lettersToDistribute);
      newLetters.push(currentLetter);
      // Remove from pool of available
      const currentIndex = lettersToDistribute.indexOf(currentLetter);
      lettersToDistribute = removeElAtIndex(lettersToDistribute, currentIndex);
      attempts++;
    }

    setLetters(newLetters);
  }

  function renderNotifcation(message = "") {
    return <p className="notification">{message}</p>;
  }

  return (
    <>
      <p>Current Score: {score}</p>
      <GuessedWords words={guessedWords} />
      {renderNotifcation(notification)}
      <div className="current-word" autoFocus={true}>
        {currentWord}
      </div>
      <br />
      <Letters
        letters={letters}
        handleLetterClick={handleLetterClick}
        centerLetter={centerLetter}
      ></Letters>
      <div className="button-container">
        <button className="reset-button game-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="shuffle-button game-button" onClick={handleShuffle}>
          Shuffle
        </button>
        <button
          className="submit-button game-button"
          onClick={handleSubmitWord}
        >
          Enter
        </button>
      </div>
    </>
  );
}
