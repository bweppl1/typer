import { useState } from "react";

const TestTimer = ({ testTime }) => {
  console.log("test");
  return (
    <div id="timerCounter" className="text-med mx-auto my-25 text-4xl">
      {testTime}
    </div>
  );
};

export default TestTimer;
