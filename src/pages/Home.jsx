import TestTimer from "../components/TestTimer.jsx";
import TypingTest from "../components/TypingTest.jsx";
import BelowTestDisplay from "../components/BelowTestDisplay.jsx";
import { useEffect, useState } from "react";

// CURRENT TASK

const Home = ({
  testType,
  setTestType,
  wordLimit,
  setWordLimit,
  testTime,
  setTestTime,
}) => {
  const [testStartTime, setTestStartTime] = useState(0);
  const [testEndTime, setTestEndTime] = useState(0);
  const [testStarted, setTestStarted] = useState(false); // test active state
  const [testComplete, setTestComplete] = useState(false); // test status
  const [testCompletionTime, setTestCompletionTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [typingErrors, setTypingErrors] = useState(0);
  const [testMessage, setTestMessage] = useState("Type to Start Test!"); // instructions displayed below the test

  return (
    <div className="max-w-5xl m-auto flex flex-col bg-darkgreen font-jetbrainsmono">
      <TestTimer
        testTime={testTime}
        wordLimit={wordLimit}
        testType={testType}
        setTestStarted={setTestStarted}
        testStarted={testStarted}
        testStartTime={testStartTime}
        setTestStartTime={setTestStartTime}
        testEndTime={testEndTime}
        setTestEndTime={setTestEndTime}
        setTestComplete={setTestComplete}
        testComplete={testComplete}
        setTestCompletionTime={setTestCompletionTime}
      />
      <TypingTest
        testTime={testTime}
        wordLimit={wordLimit}
        testStartTime={testStartTime}
        testEndTime={testEndTime}
        setTestStartTime={setTestStartTime}
        setTestEndTime={setTestEndTime}
        setTestStarted={setTestStarted}
        testComplete={testComplete}
        setTestComplete={setTestComplete}
        testCompletionTime={testCompletionTime}
        testType={testType}
        setWpm={setWpm}
      />
      <BelowTestDisplay
        testComplete={testComplete}
        testStarted={testStarted}
        wpm={wpm}
        testCompletionTime={testCompletionTime}
        testMessage={testMessage}
        setTestMessage={setTestMessage}
      />
    </div>
  );
};

export default Home;
