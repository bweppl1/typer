import { useState, useEffect } from "react";

const BelowTestDisplay = ({
  testComplete,
  testStarted,
  wpm,
  testCompletionTime,
  typingErrors,
  testMessage,
  setTestMessage,
}) => {
  useEffect(() => {
    if (!testComplete && testStarted) {
      setTestMessage("");
    } else if (!testComplete && !testStarted) {
      setTestMessage("Type to Start Test!");
    } else {
      setTestMessage("WPM: " + wpm);
    }
  }, [testComplete, testStarted]);

  return (
    <div className="font-jetbrainsmono text-2xl text-med mx-auto my-15">
      {testMessage}
    </div>
  );
};

export default BelowTestDisplay;
