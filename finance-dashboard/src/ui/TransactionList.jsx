import { useState } from "react";

function TransactionList({ records , role , addTransaction }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const visibleData = records.filter(item => {
    const searchMatch = item.category
      .toLowerCase()
      .includes(query.toLowerCase());

    const typeMatch =
      typeFilter === "all" ? true : item.type === typeFilter;

    return searchMatch && typeMatch;
  });

  return (
    <div>
      <h2 style={{ color: "inherit"}}>
        My Spending Expenses🧾
        </h2>
        {role === "admin" && (
  <button
    onClick={() => {
      const newItem = {
        id: Date.now(),
        date: "2026-04-11",
        amount: Math.floor(Math.random() * 1000),
        category: "trip",
        type: "expense",
        note: "Mental Peace🙂‍↔️",
        paymentMethod: "cash"
      };

      addTransaction(newItem);
    }} >
       ➕ Add Record
       </button>
    )}

       {role !== "admin" && (
        <p style={{color: "red"}}>
            you don't have permission to add or modify data
        </p>
       )}

      <input
        type="text"
        placeholder="Search by category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <select onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {visibleData.length === 0 ? (
        <p style={{ color: "purple" }}>
           Oops! No matching transaction found🔍</p>
      ) : (
        <table 
        border="1"
        style={{ width: "100%", borderCollapse: "collapse"}}
          >
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Note</th>
              <th>Payment Method</th>
            </tr>
          </thead>

          <tbody>
            {visibleData.map(item => (
              <tr 
               key={item.id}
               style={{ transition: "0.2s"}}
               onMouseOver={(e)=> (e.currentTarget.style.backgroundColor= "#4CAF50")}
               onMouseOut={(e)=>(e.currentTarget.style.backgroundColor= "transparent")}>
               
                <td>{item.date}</td>
                <td>₹{item.amount}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>{item.note}</td>
                <td>
                  {item.paymentMethod?.toLowerCase() === "upi" && "📱 UPI"}
                  {item.paymentMethod?.toLowerCase() === "cash" && "💵 Cash"}
                  {item.paymentMethod?.toLowerCase() === "card" && "💳 Card"}
                  {item.paymentMethod?.toLowerCase() === "bank" && "🏦 Bank"}
                </td>

                <td
                  style={{
                    color: item.type === "income" ? "🟢 green" : "🔴 red"
                  }}
                >
                  {item.type}
                </td>
            
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default TransactionList