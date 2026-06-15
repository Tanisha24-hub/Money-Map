function MonthlySummary({ records }) {

  const monthlyData = {};

  records.forEach(item => {
    const month = item.date.slice(0, 7);

    if (!monthlyData[month]) {
      monthlyData[month] = {
        income: 0,
        expense: 0
      };
    }

    if (item.type === "income") {
      monthlyData[month].income += item.amount;
    } else {
      monthlyData[month].expense += item.amount;
    }
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Monthly Summary 📊</h2>

      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expense</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(monthlyData).map(([month, data]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>₹{data.income}</td>
              <td>₹{data.expense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlySummary;