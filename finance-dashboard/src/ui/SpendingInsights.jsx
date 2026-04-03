function SpendingInsights({ records }) {

  let totalOutflow = 0;
  let expenseTracker = {};

  // loop through records
  records.forEach((item) => {
    if (item.type === "expense") {
      totalOutflow += item.amount;

      if (expenseTracker[item.category]) {
        expenseTracker[item.category] += item.amount;
      } else {
        expenseTracker[item.category] = item.amount;
      }
    }
  });

  let topCategory = "";
  let highestAmount = 0;

  for (let key in expenseTracker) {
    if (expenseTracker[key] > highestAmount) {
      highestAmount = expenseTracker[key];
      topCategory = key;
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      
      <h2 style={{ color: "inherit" }}>
        Where My Money Goes 📊</h2>

      <p> Summary of your financial activity</p>

      <p>Total Outflow: ₹{totalOutflow}</p>

      <p>
        Top Category:{" "}
        <strong>{topCategory || "No data"}</strong>
      </p>

      <p>
        {topCategory
          ? `You are spending most on ${topCategory}`
          : "No spending recorded yet"}
      </p>

      {totalOutflow > 6000 && (
        <p style={{ color: "red" }}>
          ⚠️ you are spending a lot this month
        </p>
      )}

      {topCategory && (
        <p style={{ color: "green" }}>
          💡 Tip: Try to reduce expenses on {topCategory}
        </p>
      )}

    </div>
  );
}

export default SpendingInsights;

 