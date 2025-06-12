import { useState } from "react";
// import reactLogo from "@/assets/react.svg";
// import wxtLogo from "/wxt.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto p-8 text-center min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="mb-8">
        <a href="https://wxt.dev" target="_blank" className="inline-block">
          {/* <img
            src={wxtLogo}
            className="h-24 p-6 transition-all duration-300 hover:[filter:drop-shadow(var(--drop-shadow-glow-green))]"
            alt="WXT logo"
          /> */}
        </a>
        <a href="https://react.dev" target="_blank" className="inline-block">
          {/* <img
            src={reactLogo}
            className="h-24 p-6 transition-all duration-300 hover:[filter:drop-shadow(var(--drop-shadow-glow-blue))] animate-spin-slow"
            alt="React logo"
          /> */}
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-8 leading-tight">WXT + React</h1>

      <div className="p-8 mb-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="rounded-lg border border-transparent px-5 py-3 text-base font-medium bg-gray-800 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-colors duration-200 cursor-pointer"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit{" "}
          <code className="bg-gray-800 px-2 py-1 rounded">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>

      <p className="text-gray-400">
        Click on the WXT and React logos to learn more
      </p>
    </div>
  );
}

export default App;
