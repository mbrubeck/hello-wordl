import "./App.css";
import { maxGuesses, seed } from "./util";
import Game from "./Game";
import { useEffect, useState } from "react";
import { About } from "./About";

function useSetting<T>(
  key: string,
  initial: T
): [T, (value: T | ((t: T) => T)) => void] {
  const [current, setCurrent] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (e) {
      return initial;
    }
  });
  const setSetting = (value: T | ((t: T) => T)) => {
    try {
      const v = value instanceof Function ? value(current) : value;
      setCurrent(v);
      window.localStorage.setItem(key, JSON.stringify(v));
    } catch (e) {}
  };
  return [current, setSetting];
}

function App() {
  type Page = "game" | "about" | "settings";
  const [page, setPage] = useState<Page>("game");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useSetting<boolean>("dark", prefersDark);
  const [difficulty, setDifficulty] = useSetting<number>("difficulty", 0);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    setTimeout(() => {
      // Avoid transition on page load
      document.body.style.transition = "0.3s background-color ease-out";
    }, 1);
  }, [dark]);

  const link = (emoji: string, label: string, page: Page) => (
    <a
      className="emoji-link"
      href="#"
      onClick={() => setPage(page)}
      title={label}
      aria-label={label}
    >
      {emoji}
    </a>
  );

  return (
    <div className="App-container">
      <h1>
        ourdl
      </h1>
      <div className="top-right">
        {page !== "game" ? (
          link("❌", "Close", "game")
        ) : (
          <>
            {link("❓", "About", "about")}
            {link("⚙️", "Settings", "settings")}
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 5,
          top: 5,
          visibility: page === "game" ? "visible" : "hidden",
        }}
      >
        <a
          href="#"
          onClick={() =>
            (document.location = seed
              ? "?"
              : "?today=" +
                new Date().toISOString().replace(/-/g, "").slice(0, 8))
          }
        >
          {seed ? "Random" : "Today's"}
        </a>
      </div>
      {page === "about" && <About />}
      {page === "settings" && (
        <div className="Settings">
          <div className="Settings-setting">
            <input
              id="dark-setting"
              type="checkbox"
              checked={dark}
              onChange={() => setDark((x: boolean) => !x)}
            />
            <label htmlFor="dark-setting">Dark background</label>
          </div>
          <div className="Settings-setting">
            <input
              id="difficulty-setting"
              type="range"
              min="0"
              max="2"
              value={difficulty}
              onChange={(e) => setDifficulty(+e.target.value)}
            />
            <div>
              <label htmlFor="difficulty-setting">Difficulty:</label>
              &nbsp;
              <strong>{["Normal", "Hard", "Ultra Hard"][difficulty]}</strong>
              <div
                style={{
                  fontSize: 14,
                  height: 40,
                  marginLeft: 8,
                  marginTop: 8,
                }}
              >
                {
                  [
                    `Only allows valid dictionary words.`,
                    `A symbol in its right location must stay put. Right symbols in wrong locations must occur again, in any location.`,
                    `A symbol in its right location must stay put. Right symbols in wrong locations must occur again, in a distinct location.`,
                  ][difficulty]
                }
              </div>
            </div>
          </div>
        </div>
      )}
      <Game
        maxGuesses={maxGuesses}
        hidden={page !== "game"}
        difficulty={difficulty}
      />
    </div>
  );
}

export default App;
