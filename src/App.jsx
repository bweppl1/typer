import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useState } from "react";

const App = () => {
  const [testTime, setTestTime] = useState(30);

  return (
    <div className="bg-darkgreen m-0 py-3 h-screen">
      <NavBar setTestTime={setTestTime} />
      <Home testTime={testTime} />
    </div>
  );
};

export default App;
