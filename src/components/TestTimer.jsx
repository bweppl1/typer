import { useState, useEffect } from "react";

const TestTimer = ({
  testTime,
  wordLimit,
  testType,
  setTestStartTime,
  testStartTime,
  setTestEndTime,
  testEndTime,
  setTestStarted,
  testStarted,
  setTestComplete,
  testComplete,
  setTestCompletionTime,
}) => {
  const [timer, setTimer] = useState(testTime);
  //refresh timer on setting change
  useEffect(() => {
    if (testType === "timedTest") {
      setTimer(testTime);
    }
  }, [testType, testTime, wordLimit]);
  //timer function
  const updateTimer = () => {
    console.log("update timer ran");
    if (!testStarted) {
      setTimer(testTime);
    } else {
      const timeElapsed = (Date.now() - testStartTime) / 1000;
      console.log("timeElapsed: " + timeElapsed);
      console.log("testStartTime: " + testStartTime);
      const timeRemaining = Math.floor(testTime - timeElapsed); // rounds "seconds" down to an integer
      if (timeRemaining <= 0) {
        setTestComplete(true);
      }
      setTimer(timeRemaining);
    }
  };
  // refreshes timer ever second
  useEffect(() => {
    if (!testComplete && testStarted) {
      const interval = setInterval(() => {
        updateTimer();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [updateTimer]);

  // test start
  useEffect(() => {
    if (testStarted && testStartTime === 0) {
      setTestComplete(false);
      console.log("Timer Started at: " + testStartTime);
    }
  }, [testStarted]);

  // test end
  useEffect(() => {
    setTestCompletionTime((testEndTime - testStartTime) / 1000); // set completion time in seconds
    setTestStarted(false);
    setTimer(testTime);
  }, [testComplete]);

  return (
    <div id="timerCounter" className="text-med mx-auto my-25 text-4xl">
      {timer}
    </div>
  );
};

export default TestTimer;
