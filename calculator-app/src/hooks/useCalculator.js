import { useState } from "react";
import { evaluateExpression } from "../utils/evaluate";

export const useCalculator = (externalSetHistory) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const append = (value) => {
    setExpression((prev) => prev + value);
  };

  const clear = () => {
    setExpression("");
    setResult("");
  };

  const deleteLast = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    if (!expression.trim()) return;
    try {
      const open = (expression.match(/\(/g) || []).length;
      const close = (expression.match(/\)/g) || []).length;
      const balanced =
        open > close
          ? expression + ")".repeat(open - close)
          : expression;
      const answer = evaluateExpression(balanced);
      const formatted =
        typeof answer === "number"
          ? Number.isInteger(answer)
            ? answer.toString()
            : parseFloat(answer.toFixed(10)).toString()
          : answer.toString();

      setResult(formatted);

      if (externalSetHistory) {
        externalSetHistory((prev) => [
          { mode: "scientific", expression, result: formatted },
          ...prev,
        ]);
      }

      fetch("http://localhost:5000/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression, result: formatted }),
      }).catch(() => {});
    } catch {
      setResult("Malformed Expression");
    }
  };

  const negate = () => {
    if (result && result !== "Error" && result !== "0") {
      const negated = -parseFloat(result);
      setResult(negated.toString());
      setExpression(negated.toString());
    } else if (expression) {
      if (expression.startsWith("-")) {
        setExpression(expression.slice(1));
      } else {
        setExpression("-" + expression);
      }
    }
  };

  const percent = () => {
    setExpression((prev) => prev + "%");
  };

  return {
    expression,
    result,
    append,
    clear,
    deleteLast,
    calculate,
    negate,
    percent,
  };
};
