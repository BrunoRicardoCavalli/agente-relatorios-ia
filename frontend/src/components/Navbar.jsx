import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        🤖 Agente Relatórios IA
      </div>

      <nav>
        <a href="/">Dashboard</a>
        <a href="/">Atendimentos</a>
        <a href="/">Relatórios IA</a>
      </nav>
    </header>
  );
}

export default Navbar;