import { useCallback, useEffect, useRef, useState } from "react";

import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import History from "./History";
import ThemeToggle from "./ThemeToggle";
import LoanView from "../modes/loan/LoanView";
import { loanMode } from "../modes";
import { useCalculator } from "../hooks/useCalculator";
import "../styles/calculator.css";

const MODE_OPTIONS = [
  { id: "scientific", label: "Calc" },
  { id: "loan", label: "Loan" },
];

function Calculator() {
  const [activeMode, setActiveMode] = useState("scientific");
  const [dark, setDark] = useState(true);
  const [sciSubMode, setSciSubMode] = useState(false);
  const [resultPop, setResultPop] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const prevResultRef = useRef();

  const {
    expression,
    result,
    append,
    clear,
    deleteLast,
    calculate,
    negate,
    percent,
  } = useCalculator(setHistory);

  const resultValue = result;
  useEffect(() => {
    if (resultValue && resultValue !== prevResultRef.current) {
      setResultPop(true);
      const timer = setTimeout(() => setResultPop(false), 150);
      prevResultRef.current = resultValue;
      return () => clearTimeout(timer);
    }
  }, [resultValue]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);

  const handleKeyDown = useCallback(
    (e) => {
      if (activeMode !== "scientific") return;
      const key = e.key;
      if (
        /[0-9]/.test(key) ||
        ["+", "-", "*", "/", ".", "%", "^", "(", ")"].includes(key)
      ) {
        append(key);
      }
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
      }
      if (key === "Backspace") {
        deleteLast();
      }
      if (key === "Escape") {
        clear();
      }
    },
    [activeMode, append, calculate, deleteLast, clear]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleLoanHistory = useCallback(
    (entry) => {
      setHistory((prev) => [entry, ...prev]);
    },
    []
  );

  const clearHistory = useCallback(async () => {
    try {
      await fetch("http://localhost:5000/api/history", { method: "DELETE" });
    } catch {
      /* ignore */
    }
    setHistory([]);
  }, []);

  return (
    <div
      className={`app-layout ${showHistory ? "with-history" : "no-history"}`}
    >
      <aside className={`history-panel ${showHistory ? "open" : "closed"}`}>
        <History history={history} />
        <button onClick={clearHistory} className="mode-btn1" title="Clear History">
          CLEAR
        </button>
      </aside>

      <main className="calculator-panel">
        <div className="calculator-header">
          <span className="calculator-title">
            {activeMode === "loan"
              ? loanMode.label
              : sciSubMode
              ? "Scientific"
              : "Calculator"}
          </span>
          <div className="header-actions">
            <button
              className="mode-btn"
              onClick={() => setShowHistory((p) => !p)}
              title="Toggle History"
            >
              {showHistory ? "HIDE" : "HIST"}
            </button>

            {MODE_OPTIONS.map((m) => (
              <button
                key={m.id}
                className={`mode-btn${activeMode === m.id ? " mode-btn--active" : ""}`}
                onClick={() => setActiveMode(m.id)}
              >
                {m.label}
              </button>
            ))}

            {activeMode === "scientific" && (
              <button
                className="mode-btn"
                onClick={() => setSciSubMode((s) => !s)}
                title={sciSubMode ? "Switch to Basic" : "Switch to Scientific"}
              >
                {sciSubMode ? "SCI" : "BAS"}
              </button>
            )}

            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </div>

        {activeMode === "scientific" ? (
          <>
            <Display
              expression={expression}
              result={result}
              resultPop={resultPop}
            />
            <ButtonGrid
              append={append}
              clear={clear}
              deleteLast={deleteLast}
              calculate={calculate}
              negate={negate}
              percent={percent}
              scientific={sciSubMode}
            />
          </>
        ) : (
          <LoanView mode={loanMode} onHistory={handleLoanHistory} />
        )}
      </main>
    </div>
  );
}

export default Calculator;
