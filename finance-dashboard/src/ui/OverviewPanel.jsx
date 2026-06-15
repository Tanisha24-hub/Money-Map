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

  const totalTransactions = records.length;

  const savingsRate =
    income > 0
      ? (((income - expense) / income) * 100).toFixed(1)
      : 0;
      const expenseByCategory = {};

records.forEach(item => {
  if (item.type === "expense") {
    expenseByCategory[item.category] =
      (expenseByCategory[item.category] || 0) + item.amount;
  }
});

let highestCategory = "";
let highestAmount = 0;

for (let key in expenseByCategory) {
  if (expenseByCategory[key] > highestAmount) {
    highestAmount = expenseByCategory[key];
    highestCategory = key;
  }
}
      const monthlyBudget = 50000;

const budgetUsed = (
  (expense / monthlyBudget) * 100
).toFixed(1);
      const categoryTotals = {};

records.forEach(item => {
  if (item.type === "expense") {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + item.amount;
  }
});

let topCategory = "";
let highestExpense = 0;

for (let category in categoryTotals) {
  if (categoryTotals[category] > highestExpense) {
    highestExpense = categoryTotals[category];
    topCategory = category;
  }
}

  return (
  <div>
    <h2 style={{ color: "inherit" }}>
      Finance Dashboard
    </h2>

    <div
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        marginTop: "20px"
      }}
    >
      <div
        style={{
          border: "1px solid gray",
          padding: "15px",
          borderRadius: "10px",
          minWidth: "180px"
        }}
      >
        <h3>Total Income</h3>
        <p>₹{income}</p>
      </div>

      <div
        style={{
           backgroundColor: "#2e628a",
           padding: "15px",
           borderRadius: "10px",
           minWidth: "180px"
        }}
      >
        <h3>Total Expense</h3>
        <p>₹{expense}</p>
      </div>

      <div
        style={{
          backgroundColor: "#f8d7da",
          padding: "15px",
          borderRadius: "10px",
          minWidth: "180px" 
        }}
      >
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>

      <div
        style={{
          backgroundColor: "#d1ecf1",
          padding: "15px",
          borderRadius: "10px",
          minWidth: "180px"
        }}
      >
        <h3>Total Transactions</h3>
        <p>{totalTransactions}</p>
      </div>

      <div
        style={{
           backgroundColor: "#ffe5b4",
           padding: "15px",
           borderRadius: "10px",
           minWidth: "180px"
        }}
      >
        <h3>Savings Rate</h3>
        <p>{savingsRate}%</p>
      </div>
      <div
      style={{
       backgroundColor: "#e2d9f3",
       padding: "15px",
       borderRadius: "10px",
       minWidth: "180px"
      }}
>
  <h3>Top Spending Category</h3>
  <p>{topCategory}</p>
   </div>

   <div
  style={{
      backgroundColor: "#fff3cd",
      padding: "15px",
      borderRadius: "10px",
      minWidth: "180px"
  }}
>
  <h3>Budget Used</h3>
  <>
  <p>{budgetUsed}%</p>

  <div
    style={{
      width: "100%",
      backgroundColor: "#ddd",
      height: "10px",
      borderRadius: "10px"
    }}
  >
    <div
      style={{
        width: `${Math.min(budgetUsed, 100)}%`,
        backgroundColor: "green",
        height: "100%",
        borderRadius: "10px"
      }}
    />
  </div>
</>
  </div>
  <div
  style={{
    border: "1px solid gray",
    padding: "15px",
    borderRadius: "10px",
    minWidth: "180px"
  }}
>
  <h3>Highest Expense</h3>
  <p>{highestCategory}</p>
  <p>₹{highestAmount}</p>
   </div>


    </div>
   </div>
);
}

export default OverviewPanel;