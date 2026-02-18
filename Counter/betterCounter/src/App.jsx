import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(10);

  const limitRange = (value) => Math.max(0, Math.min(100, value));

  const handlePlusFive = () => {
    setCount((c) => limitRange(c + 5));
  };

  const handleMinusTwo = () => {
    setCount((c) => limitRange(c - 2));
  };

  const handleReset = () => {
    setCount(10);
  };

  const handleDouble = () => {
    setCount((c) => limitRange(c * 2));
  };

  return (
    <div>
      <p>Count is {count}</p>
      <button onClick={handlePlusFive}>+ 5</button>
      <button onClick={handleMinusTwo}>- 2</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDouble}>Double</button>
    </div>
  );
}

export default App;
