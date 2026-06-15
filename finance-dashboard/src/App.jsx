import { useState } from "react";
import { financeData } from "./data/financeData";

import OverviewPanel from "./ui/OverviewPanel";
import TransactionList from "./ui/TransactionList";
import RoleToggle from "./ui/RoleToggle";
import SpendingInsights from "./ui/SpendingInsights";
import MonthlySummary from "./ui/MonthlySummary";
import ExpenseBarChart from "./ui/ExpenseBarChart";


import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [records, setRecords] = useState(financeData);

  const [role, setRole] = useState("viewer");

  function addTransaction(newItem) {
    setRecords([...records, newItem]);
  }
  function deleteTransaction(id) {
  setRecords(
    records.filter(item => item.id !== id)
  );
}

  function handleExport() {
    const dataString = JSON.stringify(records, null, 2);

    const file = new Blob([dataString], {
      type: "application/json",
    });

    function deleteTransaction(id) {
  setRecords(
    records.filter(item => item.id !== id)
  );
}

    const downloadLink = document.createElement("a");

    downloadLink.href = URL.createObjectURL(file);

    downloadLink.download = "moneymap-data.json";

    downloadLink.click();

    alert("Your data has been exported!");
  }

  function handleCSVExport() {
    const headers = [
      "Date",
      "Amount",
      "Category",
      "Type",
      "Note",
      "Payment Method",
    ];

    const rows = records.map((item) => [
      item.date,
      item.amount,
      item.category,
      item.type,
      item.note,
      item.paymentMethod,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "moneymap-records.csv";

    link.click();
  }

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#000000" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{
    color: darkMode ? "white" : "black"
      }}
      >
       Money Map 💸</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <button
        onClick={handleExport}
        style={{
          margin: "10px",
          padding: "8px",
          borderRadius: "6px",
        }}
      >
        📥 Download My Records
      </button>

      <button
        onClick={handleCSVExport}
        style={{
          margin: "10px",
          padding: "8px",
          borderRadius: "6px",
        }}
      >
        📊 Export CSV
      </button>

      <RoleToggle currentRole={role} setRole={setRole} />

      <p>
        Current Mode:{" "}
        {role === "admin" ? "Full Control 🔓" : "View Only 👁️"}
      </p>

      <OverviewPanel records={records} />

      <TransactionList
        records={records}
        role={role}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
      />

      <SpendingInsights records={records} />

      <MonthlySummary records={records} />

      <ExpenseBarChart records={records} />

      

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Created by Tanisha Jha
        <br />
        Developed as a Frontend + Data Analytics Project
      </p>
    </div>
  );
}

export default App;