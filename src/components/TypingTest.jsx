import { useState, useEffect } from "react";

const TypingTest = (testTime) => {
  const [newTest, setNewTest] = useState("test");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState([]);
  const [testStartTime, setTestStartTime] = useState(0);
  const [testEndTime, setTestEndTime] = useState(0);
  const [testStarted, setTestStarted] = useState(false); // test active state
  const [testComplete, setTestComplete] = useState(false); // test status
  const [testCompletionTime, setTestCompletionTime] = useState(null);
  const [testMessage, setTestMessage] = useState(null); // display below test on completion **NOT IMPLEMENTED YET**

  // temporary test setter
  useEffect(() => {
    setNewTest("The quick brown fox jumps over the lazy dog.");
  }, []);
  // Render new test, reset all values
  const renderNewTest = () => {
    const testChoices = ["Hello how are you.", "My name is Brent Weppler"];
    // setNewTest(testChoices[Math.floor(Math.random * testChoices.length)]);
    setNewTest("Twinkle twinkle little star.");
    setCurrentIndex(0);
    setTestStartTime(0);
    setTestEndTime(0);
    setTypedLetters([]);
    setTestStarted(false);
    setTestComplete(false);
    setTestMessage("Type to Start!");
  };

  // render test logic
  const renderTypingTest = () => {
    return newTest.split("").map((letter, index) => {
      const isTyped = index < currentIndex; // sets state as behind the cursor
      const isCurrentLetter = index === currentIndex; // sets state as current letter
      let className = "ml-1";
      // formats text-color for letters that are behind the cursor
      const isCorrect = () => {
        if (
          newTest[index] === typedLetters[index] &&
          isTyped &&
          index < currentIndex
        ) {
          className += " text-light";
        } else if (
          newTest[index] != typedLetters[index] &&
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
  useEffect(() => {
    setTestMessage("Type to Start!");
  }, [newTest]);

  // handling key presses
  useEffect(() => {
    const handleKeyPress = (e) => {
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
        if (currentIndex >= newTest.length - 1) {
          setTestComplete(true);
          setTestMessage("Test Complete! - hit Enter to restart!");
        }
        if (!testStarted) {
          // start timer on first key strike
          setTestStartTime(Date.now());
          setTestStarted(true);
          setTestMessage("");
        }
      }
      if (currentIndex >= newTest.length - 1 && e.code === "Enter") {
        renderNewTest();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);
  // logic for completed test
  useEffect(() => {
    setTestEndTime(Date.now());
    setTestCompletionTime(testEndTime - testStartTime);
  }, [testComplete]);
  // return component
  const belowTestMessage = () => {
    return testMessage;
  };
  return (
    <div className="max-w-5xl mx-auto flex flex-col justify-center text-center">
      <div className="m-auto text-3xl text-lightolive">
        {renderTypingTest()}
      </div>
      <div className="text-2xl text-med my-10 mx-auto">
        {belowTestMessage()}
      </div>
    </div>
  );
};
export default TypingTest;
