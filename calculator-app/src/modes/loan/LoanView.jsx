import { useCallback, useState } from "react";

function InputField({ config, value, error, onChange }) {
  return (
    <div className={`loan-field${error ? " loan-field--error" : ""}`}>
      <label className="loan-label">{config.label}</label>
      <div className="loan-input-wrap">
        {config.prefix && <span className="loan-prefix">{config.prefix}</span>}
        <input
          className="loan-input"
          type={config.type || "text"}
          value={value}
          placeholder={config.placeholder}
          onChange={(e) => onChange(config.key, e.target.value)}
        />
        {config.suffix && <span className="loan-suffix">{config.suffix}</span>}
      </div>
      {error && <span className="loan-error">{error}</span>}
    </div>
  );
}

function OutputRow({ config, value }) {
  return (
    <div className="loan-output-row">
      <span className="loan-output-label">{config.label}</span>
      <span className="loan-output-value">
        {config.prefix && <span className="loan-output-prefix">{config.prefix}</span>}
        {value || "\u2014"}
      </span>
    </div>
  );
}

function LoanView({ mode, onHistory }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const handleChange = useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setResults(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const { valid, errors: validationErrors, parsed } = mode.validate(values);
    setErrors(validationErrors);

    if (!valid) return;

    const output = mode.execute(parsed);
    setResults(output);

    if (onHistory) {
      onHistory({
        mode: mode.id,
        label: mode.label,
        inputs: { ...parsed },
        outputs: { ...output },
      });
    }
  }, [mode, values, onHistory]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleCalculate();
      }
    },
    [handleCalculate]
  );

  return (
    <div className="loan-view">
      <div className="loan-inputs">
        {mode.inputs.map((field) => (
          <InputField
            key={field.key}
            config={field}
            value={values[field.key] ?? ""}
            error={errors[field.key]}
            onChange={handleChange}
          />
        ))}
        <button className="loan-calc-btn" onClick={handleCalculate} type="button">
          Calculate
        </button>
      </div>

      {results && (
        <div className="loan-outputs" onKeyDown={handleKeyDown}>
          {mode.outputs.map((field) => (
            <OutputRow key={field.key} config={field} value={results[field.key]} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LoanView;
