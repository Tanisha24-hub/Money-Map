function OverviewPanel({ records }) {
  let income = 0;
  let expense = 0;

  records.forEach(item => {
    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;
    }
  });

  let balance = income - expense;

  return (
    <div>
      <h2 style={{ color:"inherit"}}>
        Finance Dashboard
        </h2>
      <p>Total Income: ₹{income}</p>
      <p>Total Expense: ₹{expense}</p>
      <p>Remaining Balance: ₹{balance}</p>
    </div>
  );
}

export default OverviewPanel;