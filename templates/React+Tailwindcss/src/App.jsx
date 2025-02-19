import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import tailwind from "./assets/tailwind.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-800 p-6 transition-all">
      {/* Logo Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-28 md:w-24 lg:w-28 transition-all hover:scale-110 logo  " alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-28 md:w-24 lg:w-28 transition-all hover:scale-110  logo react " alt="React logo" />
        </a>
        <a href="https://tailwindcss.com" target="_blank">
          <img src={tailwind} className="w-28 md:w-24 lg:w-28 transition-all hover:scale-110 logo tailwind " alt="Tailwind CSS logo" />
        </a>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white transition-all">
        Vite + React + Tailwind CSS
      </h1>

      {/* Card Section */}
      <div className="mt-6 bg-white dark:bg-zinc-800 shadow-md rounded-xl p-6 flex flex-col items-center transition-all">
        <button
          className="px-6 py-3 bg-gray-700 dark:bg-zinc-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 dark:hover:bg-zinc-700 transition-all"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-center text-sm md:text-base transition-all">
          Edit <code className="bg-gray-200 dark:bg-gray-700 p-1 rounded">src/App.jsx</code> and save to test HMR.
        </p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-gray-600 dark:text-gray-300 text-center transition-all">
        Click on the Vite, React, and Tailwind logos to learn more.
        create by <a href="https://github.com/sumangal44/blueprint-cli" className="text-blue-800 dark:text-blue-400 hover:underline"> Blueprint CLI</a>
      </p>
    </div>
  );
}

export default App;
