function Display({ expression, result, resultPop }) {
  return (
    <div className="display">
      <div className="expression">{expression}</div>
      <div className={`result${resultPop ? " pop" : ""}`}>
        {result || "0"}
      </div>
    </div>
  );
}

export default Display;
