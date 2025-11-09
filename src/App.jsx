import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useState } from "react";

const App = () => {
  const [testType, setTestType] = useState("wordLimit"); // swap to ENUM eventually
  const [wordLimit, setWordLimit] = useState(25);
  const [testTime, setTestTime] = useState(15);
  return (
    <div className="bg-darkgreen m-0 py-3 h-screen">
      <NavBar
        setTestType={setTestType}
        setWordLimit={setWordLimit}
        setTestTime={setTestTime}
      />
      <Home
        setTestType={setTestType}
        setWordLimit={setWordLimit}
        setTestTime={setTestTime}
        testType={testType}
        wordLimit={wordLimit}
        testTime={testTime}
      />
    </div>
  );
};

export default App;
