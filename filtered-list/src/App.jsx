import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// ### R3 — Filterable List

// **Prompt:** Given `items = ["Apple", "Banana", "Orange", "Grape"]`, build `<FilterableList items={items} />`.

// - Render all items
// - Add a search input that filters items by substring (case-insensitive)

// **Stretch (if time):**

// - Show “No results” when nothing matches

// **Business case:** Filtering users/orders, searching catalogs, quick admin search.
// **Why they ask:** Tests controlled inputs + derived state, correct matching logic, and empty-state UX.

function App() {
  const fruits = ["Apple", "Banana", "Orange", "Grape"];
  const [search, setSearch] = useState("");
  const handleSearch = (e) => setSearch(e.target.value);
  const normalizedSearch = search.toLocaleLowerCase();
  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLocaleLowerCase().includes(normalizedSearch),
  );

  return (
    <div>
      <input value={search} onChange={handleSearch} placeholder="Search..." />{" "}
      {/* controlled input */}
      <ul>
        {filteredFruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
