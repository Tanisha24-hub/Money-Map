import { useState, useEffect } from "react";
import { financeData } from "./data/financeData";
import OverviewPanel from "./ui/OverviewPanel";
import TransactionList from "./ui/TransactionList";
import RoleToggle from "./ui/RoleToggle";
import SpendingInsights from "./ui/SpendingInsights";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false); 
  const [records, setRecords] = useState(()=> {
    const saved= localStorage.getItem("money-data");
    return saved ? JSON.parse(saved): financeData;
  });

  useEffect(()=> {
    localStorage.setItem("money-data", JSON.stringify(records));
  }, [records]);

  const [role, setRole] = useState("viewer");
 
  function addTransaction(newItem) {
  setRecords([...records, newItem]);
  }
  function handleExport() {
  const dataString = JSON.stringify(records, null, 2);


  const file = new Blob([dataString], {
    type: "application/json",
  });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = "moneymap-data.json";
  downloadLink.click();
  alert("Your data has been exported!");
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
      <h1 style={{ color: "inherit"}}>
        My Money Tracker💰
        </h1>

      <h1 style={{ color: "inherit"}}>
        MoneyMap 💸
        </h1>

      <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <button
          onClick={handleExport}
          style={{
            margin: "10px",
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "#222",
            color: "white"
            }}
            onMouseOver={(e)=>(e.target.style.backgroundColor= "rgb(179, 52, 158)")}
            onMouseOut={(e)=>(e.target.style.backgroundColor="rgb(70, 34, 128)")}>
        
           📥 Download My Records
           </button>

      <RoleToggle currentRole={role} setRole={setRole} />
    <p>
      Current Mode: {role==="admin"? "Full Control🔓" : "View only👁️"}
    </p>
      <OverviewPanel records={records}/>
      <TransactionList records={records} role={role} addTransaction={addTransaction}/>
      <SpendingInsights records={records}/> 

      <p style={{ textAlign: "center", marginTop: "20px"}}>
        Created by Tanisha Jha <br />
        Developed as a part of a frontend internship assignment
        </p>

    </div>
  );
}
  
export default App;