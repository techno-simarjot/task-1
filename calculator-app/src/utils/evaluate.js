import { create, all } from "mathjs";

const math = create(all);

const customScope = {
  sin: (x) => math.sin(math.unit(x, "deg")),
  cos: (x) => math.cos(math.unit(x, "deg")),
  tan: (x) => math.tan(math.unit(x, "deg")),
  asin: (x) => math.unit(math.asin(x), "rad").toNumber("deg"),
  acos: (x) => math.unit(math.acos(x), "rad").toNumber("deg"),
  atan: (x) => math.unit(math.atan(x), "rad").toNumber("deg"),
  log: (x) => math.log10(x),
  ln: (x) => math.log(x),
};

// function hasImplicitMultiplication(expr) {
//   return /(?:[0-9)][a-zA-Z(\u03C0(])|(?:[a-zA-Z)]\d)/.test(expr);
// }

export const evaluateExpression = (expression) => {
  let expr = expression;


  if (/\d+%\d/.test(expr)) {
    throw new Error("Invalid percentage usage");
  }

  expr = expr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

  try {
    return math.evaluate(expr, customScope);
  } catch {
    throw new Error("Invalid Expression");
  }
};
