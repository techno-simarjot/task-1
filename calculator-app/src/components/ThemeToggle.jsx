function ThemeToggle({ dark, setDark }) {
  return (
    <button
      className="theme-btn"
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
    >
      {dark ? "\u2600" : "\u263D"}
    </button>
  );
}

export default ThemeToggle;
