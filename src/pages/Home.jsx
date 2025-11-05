import TypingTest from "../components/TypingTest.jsx";
import { useEffect, useState } from "react";

// CURRENT TASK
// 1. working on timer/word counter
// 2. bug where cursor isn't iterating forward on keypresses

const Home = ({ testTime }) => {
  const [timer, setTimer] = useState(0);
  const [testStartTime, setTestStartTime] = useState(0);
  const [testEndTime, setTestEndTime] = useState(0);
  const [completeMessage, setCompleteMessage] = useState(null); // display below test on completion **NOT IMPLEMENTED YET**

  // Display for either time remaining or words remaining
  const testClock = () => {
    return testTime;
  };

  return (
    <div className="max-w-5xl m-auto flex flex-col h-150 bg-darkgreen font-jetbrainsmono">
      <div id="timerCounter" className="text-med m-auto text-4xl">
        {testClock()}
      </div>
      <TypingTest testTime={testTime} />
      {completeMessage && (
        <div className="text-2xl mx-auto">Test Complete!</div>
      )}
    </div>
  );
};

export default Home;
