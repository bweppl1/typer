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

  // temporary test setter
  useEffect(() => {
    setNewTest("The quick brown fox jumps over the lazy dog.");
  }, []);
  // render test logic
  const renderTypingTest = () => {
    return newTest.split("").map((letter, index) => {
      const isTyped = index < currentIndex; // sets state as behind the cursor
      const isCurrentLetter = index === currentIndex; // sets state as current letter
      let className;
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
      if (isCurrentLetter) className += " border-b-2 border-light";

      return (
        // rendering the individual characters
        <span key={index} className={className}>
          {letter}
        </span>
      );
    });
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      // start timer on first key strike
      if (!testStarted) {
        setTestStartTime(Date.now());
        setTestStarted(true);
      }
      const typedLetter = e.key;
      // capturing array of typed letters
      setTypedLetters([...typedLetters, typedLetter]);
      console.log("typed " + { typedLetter }); // not functioning, debug later
      // Ensuring current letter only progresses upon letter, space or period input
      if (
        e.code.startsWith("Key") ||
        e.code === "Space" ||
        e.code === "Period"
      ) {
        setCurrentIndex(currentIndex + 1); // progresses current letter
        if (currentIndex > newTest.length) {
          setTestComplete(true);
        }
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
  return <div className="m-auto text-2xl text-med">{renderTypingTest()}</div>;
};
export default TypingTest;
