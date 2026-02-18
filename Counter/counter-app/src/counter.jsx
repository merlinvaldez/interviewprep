// **Prompt:** Build a `<Counter />` component.

// - Start at `0`
// - Buttons: `+`, `-`, `Reset`
// - `+` increments by 1, `-` decrements by 1
// - The count must **not** go below `0`

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((c) => c + 1);
  };

  const handleDecrease = () => {
    setCount((c) => c - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
      <button onClick={handleReset}>Reset</button>
      <p>Count is :{count}</p>
    </div>
  );
}
