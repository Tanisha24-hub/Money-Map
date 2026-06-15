function ExpenseBarChart({ records }) {
  const categoryTotals = {};

  records.forEach((item) => {
    if (item.type === "expense") {
      categoryTotals[item.category] =
        (categoryTotals[item.category] || 0) + item.amount;
    }
  });

  const maxValue = Math.max(...Object.values(categoryTotals));

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Expense Analysis 📊</h2>

      {Object.entries(categoryTotals).map(([category, amount]) => (
        <div key={category} style={{ marginBottom: "15px" }}>
          <p>
            <strong>{category}</strong> - ₹{amount}
          </p>

          <div
            style={{
              width: "100%",
              height: "25px",
              backgroundColor: "#ddd",
              borderRadius: "8px"
            }}
          >
            <div
              style={{
                width: `${(amount / maxValue) * 100}%`,
                height: "100%",
                backgroundColor: "#4CAF50",
                borderRadius: "8px"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseBarChart;