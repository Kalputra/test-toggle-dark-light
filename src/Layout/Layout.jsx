import { Outlet } from "react-router-dom";
import { useThemeContext } from "../Context/ThemeContext";
import { ToggleLeft, ToggleRight } from "react-feather";

export default function Layout() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Anime">Anime</a>
          </li>
          <li>
            <a href="/page2">Page 2</a>
          </li>
          <li>
            <a href="/page3">Page 3</a>
          </li>
        </ul>
        <div>
          {theme === "light" ? (
            <button onClick={() => setTheme("dark")}>
              <ToggleLeft />
            </button>
          ) : (
            <button onClick={() => setTheme("light")}>
              <ToggleRight />
            </button>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
