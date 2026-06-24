import Button from "./Button";
import {
  scientificButtons,
  extraScientificButtons,
  standardButtons,
} from "../utils/scientific";

function ButtonGrid({
  append,
  clear,
  deleteLast,
  calculate,
  negate,
  percent,
  scientific,
}) {
  const handleScientific = (btn) => {
    switch (btn) {
      case "\u221A":
        append("sqrt(");
        break;
      case "x\u00B2":
        append("^2");
        break;
      case "x\u00B3":
        append("^3");
        break;
      case "sin":
        append("sin(");
        break;
      case "cos":
        append("cos(");
        break;
      case "tan":
        append("tan(");
        break;
      case "log":
        append("log(");
        break;
      case "ln":
        append("ln(");
        break;
      case "\u03C0":
        append("pi");
        break;
      case "^":
        append("^");
        break;
      default:
        append(btn);
    }
  };

  const handleExtraScientific = (btn) => {
    switch (btn) {
      case "x!":
        append("!");
        break;
      case "1/x":
        append("^(-1)");
        break;
      case "|x|":
        append("abs(");
        break;
      case "e\u02E3":
        append("exp(");
        break;
      case "10\u02E3":
        append("10^(");
        break;
      case "\u221Bx":
        append("cbrt(");
        break;
      case "sin\u207B\u00B9":
        append("asin(");
        break;
      case "cos\u207B\u00B9":
        append("acos(");
        break;
      case "tan\u207B\u00B9":
        append("atan(");
        break;
      case "mod":
        append(" mod ");
        break;
      default:
        append(btn);
    }
  };

  const handleStandard = (btn) => {
    switch (btn) {
      case "AC":
        clear();
        break;
      case "\u232B":
        deleteLast();
        break;
      case "=":
        calculate();
        break;
      case "+/-":
        negate();
        break;
      case "%":
        percent();
        break;
      default:
        append(btn);
    }
  };

  const getType = (btn) => {
    if (["+", "-", "*", "/"].includes(btn)) return "operator";
    if (btn === "=") return "equal";
    if (btn === "AC" || btn === "\u232B") return "clear";
    return "";
  };

  return (
    <>
      {scientific && (
        <>
          <div className="scientific-grid">
            {scientificButtons.map((btn) => (
              <Button
                key={btn}
                label={btn}
                type="scientific"
                onClick={() => handleScientific(btn)}
              />
            ))}
          </div>
          <div className="extra-scientific-grid">
            {extraScientificButtons.map((btn) => (
              <Button
                key={btn}
                label={btn}
                type="scientific"
                onClick={() => handleExtraScientific(btn)}
              />
            ))}
          </div>
        </>
      )}

      <div className="button-grid">
        {standardButtons.map((btn) => (
          <Button
            key={btn}
            label={btn}
            type={getType(btn)}
            onClick={() => handleStandard(btn)}
          />
        ))}
      </div>
    </>
  );
}

export default ButtonGrid;
