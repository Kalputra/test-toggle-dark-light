import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToggleLeft, ToggleRight } from 'react-feather'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  console.log('Current theme:', theme);

  return (
    <div className={theme === 'light' ? "background-light" : "background-dark"}>
      <div>
        {
          theme === 'light' ? (
            <button onClick={() => setTheme('dark')}><ToggleLeft/></button>
          ) : (
            <button onClick={() => setTheme('light')}><ToggleRight/></button>
          )
        }
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className={theme === 'light' ? "text-black" : "text-white"}>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} className={theme === 'light' ? "button-light" : "button-dark"}>
          count is {count}
        </button>
        <p className={theme === 'light' ? "text-black" : "text-white"}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App