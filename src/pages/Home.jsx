import { useEffect, useState } from "react";

const Home = ({ testTime }) => {
  // const [timer, setTimer] = useState(0);
  const [newTest, setNewTest] = useState("test");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState([]);

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

  // handle keypress logic
  useEffect(() => {
    const handleKeyPress = (e) => {
      const typedLetter = e.key;
      // capturing array of typed letters
      setTypedLetters([...typedLetters, typedLetter]);
      // console.log("typed " + { typedLetter }); // not functioning, debug later
      // Ensuring current letter only progresses upon letter, space or period input
      if (
        e.code.startsWith("Key") ||
        e.code === "Space" ||
        e.code === "Period"
      ) {
        setCurrentIndex(currentIndex + 1); // progresses current letter
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  return (
    <div className="max-w-5xl m-auto flex h-150 bg-darkgreen font-jetbrainsmono">
      {newTest && (
        <div className="m-auto text-2xl text-med">{renderTypingTest()}</div>
      )}
    </div>
  );
};

export default Home;
