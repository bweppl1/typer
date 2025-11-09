import { useState, useEffect } from "react";

// BUGS
// 1. Can't generate random test on initial render.

const TypingTest = ({
  testTime,
  wordLimit,
  testType,
  testSartTime,
  testEndTime,
  setTestStartTime,
  setTestEndTime,
  testStarted,
  setTestStarted,
  testComplete,
  setTestComplete,
  wpm,
  setWpm,
  typingErrors,
  setTypingErrors,
  testCompletionTime,
}) => {
  const [currentTest, setCurrentTest] = useState(
    "I like big butts and I cannot lie.",
  ); // holds state for current test, probably should call it currentTest
  const [currentIndex, setCurrentIndex] = useState(0); // current index in the test that the user is typing
  const [typedLetters, setTypedLetters] = useState([]);
  const [testWords, setTestWords] = useState([]);

  // load test words in from testWords.txt
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/testWords.txt");
        const csvText = await response.text();
        const lines = csvText.split("\n");
        setTestWords(lines);
      } catch (error) {
        console.error("Error loading CSV", error);
      }
    };
    loadCSV();
  }, []);

  // re-render on test type change
  useEffect(() => {
    renderNewTest();
  }, [testType, wordLimit, testTime]);
  // randomly generate test
  const generateRandomTest = () => {
    let wordList = [];
    while (wordList.length < wordLimit) {
      wordList.push(
        testWords[Math.floor(Math.random() * testWords.length - 1)],
      );
    }
    const randomSentence = wordList.join(" ");
    return randomSentence;
  };
  // Render new test, reset all values
  const renderNewTest = () => {
    // setNewTest(testChoices[Math.floor(Math.random * testChoices.length)]);
    setCurrentTest(generateRandomTest());
    setCurrentIndex(0);
    setTypedLetters([]);
    setTestComplete(false);
    setTestStarted(false);
    setTestStartTime(0);
    setTestEndTime(0);
  };

  // render test logic
  const renderTypingTest = () => {
    if (!currentTest) {
      return <span>LOADING...</span>;
    }
    return currentTest.split("").map((letter, index) => {
      const isTyped = index < currentIndex; // sets state as behind the cursor
      const isCurrentLetter = index === currentIndex; // sets state as current letter
      let className = "ml-1";
      // formats text-color for letters that are behind the cursor
      const isCorrect = () => {
        if (
          currentTest[index] === typedLetters[index] &&
          isTyped &&
          index < currentIndex
        ) {
          className += " text-light";
        } else if (
          currentTest[index] != typedLetters[index] &&
          isTyped &&
          index < currentIndex
        ) {
          className += " text-wrongred";
        }
      };
      isCorrect();
      // highlights the current character to type
      if (isCurrentLetter) className += " border-l-3 border-light";

      return (
        // rendering the individual characters
        <span key={index} className={className}>
          {letter}
        </span>
      );
    });
  };
  // handling key presses
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!testStarted && !testComplete) {
        // start timer on first key strike
        setTestStarted(true);
        setTestStartTime(Date.now());
      }
      if (e.code === "Backspace" && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex(currentIndex - 1);
        setTypedLetters(typedLetters.slice(0, -1));
        console.log("Typed letters: " + typedLetters);
      }
      // Ensuring current letter only progresses upon letter, space or period input
      if (
        e.code.startsWith("Key") ||
        e.code === "Space" ||
        e.code === "Period"
      ) {
        const typedLetter = e.key;
        // capturing array of typed letters
        setTypedLetters([...typedLetters, typedLetter]);
        console.log("typed " + typedLetter); // not functioning, debug later
        setCurrentIndex(currentIndex + 1); // progresses current letter
        if (currentIndex >= currentTest.length - 1) {
          setTestComplete(true);
          setTestEndTime(Date.now());
        }
      }
      if (currentIndex >= currentTest.length - 1 && e.code === "Enter") {
        renderNewTest();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);
  const calculateWpm = () => {
    const averageWordLength = 6;
    const testWordCount = Math.floor(currentTest.length / averageWordLength);
    console.log("test word count: " + testWordCount);
    console.log("test completion time: " + testCompletionTime);
    setWpm((testWordCount * 60) / testCompletionTime);
    console.log("wpm: " + wpm);
  };
  useEffect(() => {
    calculateWpm();
  }, [testCompletionTime]);
  return (
    <div className="max-w-5xl mx-auto flex flex-col justify-center text-center">
      {currentTest && (
        <div className="m-auto text-3xl text-lightolive">
          {renderTypingTest()}
        </div>
      )}
      {/* <div className="text-2xl text-med my-10 mx-auto"> */}
      {/*   {belowTestMessage()} */}
      {/* </div> */}
    </div>
  );
};
export default TypingTest;
