function RoleToggle({ currentRole, setRole }) {
  return (
    <div>
      <label>Select Role: </label>

      <select onChange={(e) => setRole(e.target.value)} value={currentRole}>
      <option value="viewer">viewer 👁️</option>
      <option value="admin">Manager 🛠️</option>
      </select>
    </div>
  );
}

export default RoleToggle;