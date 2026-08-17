function DashboardCard({ titulo, valor }) {
  return (
    <div className="dashboard-card">
      <h3>{titulo}</h3>
      <strong>{valor}</strong>
    </div>
  );
}

export default DashboardCard;