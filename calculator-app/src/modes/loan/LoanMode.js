import { CalcMode } from "../core/CalcMode";

export class LoanMode extends CalcMode {
  get id() {
    return "loan";
  }

  get label() {
    return "Loan Calculator";
  }

  get inputs() {
    return [
      {
        key: "principal",
        label: "Principal Amount",
        type: "number",
        placeholder: "e.g. 500000",
        prefix: "\u20B9",
      },
      {
        key: "interestRate",
        label: "Annual Interest Rate (%)",
        type: "number",
        placeholder: "e.g. 8.5",
        suffix: "%",
      },
      {
        key: "tenure",
        label: "Tenure (Years)",
        type: "number",
        placeholder: "e.g. 20",
        suffix: "yrs",
      },
    ];
  }

  get outputs() {
    return [
      { key: "monthlyPayment", label: "Monthly EMI", prefix: "\u20B9" },
      { key: "totalPayment", label: "Total Payment", prefix: "\u20B9" },
      { key: "totalInterest", label: "Total Interest", prefix: "\u20B9" },
    ];
  }

  validate(inputs) {
    const errors = {};
    const parsed = {};

    const p = parseFloat(inputs.principal);
    const r = parseFloat(inputs.interestRate);
    const t = parseFloat(inputs.tenure);

    if (
      inputs.principal === "" ||
      inputs.principal == null ||
      isNaN(p) ||
      p <= 0
    ) {
      errors.principal = "Enter a valid principal amount";
    } else {
      parsed.principal = p;
    }

    if (inputs.interestRate === "" || inputs.interestRate == null || isNaN(r)) {
      errors.interestRate = "Enter a valid interest rate";
    } else if (r < 0) {
      errors.interestRate = "Interest rate cannot be negative";
    } else {
      parsed.interestRate = r;
    }

    if (inputs.tenure === "" || inputs.tenure == null || isNaN(t) || t <= 0) {
      errors.tenure = "Enter a valid tenure in years";
    } else {
      parsed.tenure = t;
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
      parsed,
    };
  }

  execute(inputs) {
    const { principal, interestRate, tenure } = inputs;
    const N = tenure * 12;
    const R = interestRate / 12 / 100;

    let monthlyPayment;
    if (R === 0) {
      monthlyPayment = principal / N;
    } else {
      const base = 1 + R;
      const pow = Math.pow(base, N);
      monthlyPayment = (principal * R * pow) / (pow - 1);
    }

    const totalPayment = monthlyPayment * N;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  }
}
