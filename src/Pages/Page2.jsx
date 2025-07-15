import { useThemeContext } from "../Context/ThemeContext";

export default function Page2() {
  const { theme } = useThemeContext();

  const styles = {
    color: theme === "dark" ? "white" : "black",
    backgroundColor: theme === "dark" ? "#222" : "#fff",
    minHeight: "100vh",
    padding: "20px",
  };

  return (
    <div style={styles}>
      <h1>Page 2</h1>
      <p>This is the second page of the application.</p>
      {/* <button onClick={toggleTheme}>
            Toggle Theme
        </button> */}
    </div>
  );
}
