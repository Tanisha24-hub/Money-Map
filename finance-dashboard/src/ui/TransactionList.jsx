import { useState } from "react";

function TransactionList({ records , role , addTransaction , deleteTransaction }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const visibleData = records.filter(item => {
    const categoryMatch =
     categoryFilter === "all"
    ? true
    : item.category === categoryFilter;
    const searchMatch = item.category
      .toLowerCase()
      .includes(query.toLowerCase());

    const typeMatch =
      typeFilter === "all" ? true : item.type === typeFilter;
     console.log("Records:", records);
     console.log("Count:", records.length);
     const fromMatch =
     !fromDate || item.date >= fromDate;

      const toMatch =
      !toDate || item.date <= toDate;
     
     return (
            searchMatch &&
            typeMatch &&
            categoryMatch &&
            fromMatch &&
            toMatch
);
  });
  
  const categories = [
  "all",
  ...new Set(records.map(item => item.category))
   ];
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

      <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
>
    {categories.map(category => (
    <option key={category} value={category}>
      {category}
    </option>
      ))}
     </select>

     <br /><br />

<label>From Date: </label>
<input
  type="date"
  value={fromDate}
  onChange={(e) => setFromDate(e.target.value)}
/>

<br /><br />

<label>To Date: </label>
<input
  type="date"
  value={toDate}
  onChange={(e) => setToDate(e.target.value)}
   />

     <br /><br />

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
              <th>ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              <th>Note</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visibleData.map(item => (
              <tr 
               key={item.id}
               style={{ transition: "0.2s"}}
               onMouseOver={(e)=> (e.currentTarget.style.backgroundColor= "#4CAF50")}
               onMouseOut={(e)=>(e.currentTarget.style.backgroundColor= "transparent")}>
                <td>{item.id}</td>
               
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
                <td>
                   {role === "admin" && (
    <button
      onClick={() => deleteTransaction(item.id)}
    >
      Delete
    </button>
                 )}
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