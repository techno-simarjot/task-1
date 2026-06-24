function History({ history }) {
  return (
    <>
      <h2 className="history-title">History</h2>

      {history.length === 0 && (
        <p className="empty-history">No calculations yet</p>
      )}

      <div className="history-list">
        {history.map((item, index) => (
          <div className="history-item" key={index}>
            {item.mode === "loan" ? (
              <>
                <div className="history-expression">{item.label}</div>
                <div className="history-result-line">
                  EMI: <strong>{item.outputs.monthlyPayment}</strong>
                </div>
                <div className="history-result-line">
                  Total: <strong>{item.outputs.totalPayment}</strong>
                </div>
              </>
            ) : (
              <>
                <div className="history-expression">{item.expression}</div>
                <div className="history-result">= {item.result}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default History;
