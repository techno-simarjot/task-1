import { LoanMode } from "./loan/LoanMode";

/**
 * Registry of all available calculator modes.
 *
 * ── Adding a new mode ──────────────────────────────────────────────
 *
 * 1. Create a class extending CalcMode in src/modes/<name>/<Name>Mode.js
 *
 *    import { CalcMode } from "../core/CalcMode";
 *
 *    export class CurrencyMode extends CalcMode {
 *      get id()    { return "currency"; }
 *      get label() { return "Currency Converter"; }
 *
 *      get inputs() { return [
 *        { key: "amount",  label: "Amount",       type: "number" },
 *        { key: "from",    label: "From Currency", type: "text"   },
 *        { key: "to",      label: "To Currency",   type: "text"   },
 *      ];}
 *
 *      get outputs() { return [
 *        { key: "converted", label: "Converted Amount", prefix: "$" },
 *      ];}
 *
 *      validate(inputs) { /* ... *\/ }
 *      execute(inputs)  { /* ... *\/ }
 *    }
 *
 * 2. Create a view component at src/modes/<name>/<Name>View.jsx
 *    that receives { mode, onHistory } props.
 *
 * 3. Import the mode class below and add it to the MODES array.
 *
 *    import { CurrencyMode } from "./currency/CurrencyMode";
 *
 *    export const MODES = [ scientificMode, loanMode, new CurrencyMode() ];
 *
 * 4. Import the view in Calculator.jsx and map it in modeViews.
 *
 *    import CurrencyView from "./modes/currency/CurrencyView";
 *
 *    const modeViews = {
 *      scientific: <ScientificView ... />,
 *      loan:       <LoanView ... />,
 *      currency:   <CurrencyView ... />,
 *    };
 *
 * That's it — everything else (validation, execution, history, UI layout)
 * is driven by the mode's own inputs/outputs definitions.
 * ───────────────────────────────────────────────────────────────────
 */

export const loanMode = new LoanMode();
