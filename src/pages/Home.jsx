import TestTimer from "../components/TestTimer.jsx";
import TypingTest from "../components/TypingTest.jsx";
import { useEffect, useState } from "react";

// CURRENT TASK

const Home = ({ testTime }) => {
  const [timer, setTimer] = useState(0);
  const [testStartTime, setTestStartTime] = useState(0);
  const [testEndTime, setTestEndTime] = useState(0);

  // Display for either time remaining or words remaining
  const testClock = () => {
    return testTime;
  };

  return (
    <div className="max-w-5xl m-auto flex flex-col bg-darkgreen font-jetbrainsmono">
      <TestTimer testTime={testTime} />
      <TypingTest testTime={testTime} />
    </div>
  );
};

export default Home;
