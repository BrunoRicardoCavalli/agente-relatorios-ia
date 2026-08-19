import "./Navbar.css";

function Navbar({ pagina, setPagina }) {
  return (
    <header className="navbar">
      <div className="logo">
        🤖 Agente Relatórios IA
      </div>

      <nav>
        <button
          type="button"
          className={pagina === "dashboard" ? "ativo" : ""}
          onClick={() => setPagina("dashboard")}
        >
          Dashboard
        </button>

        <button
          type="button"
          className={pagina === "atendimentos" ? "ativo" : ""}
          onClick={() => setPagina("atendimentos")}
        >
          Atendimentos
        </button>

        <button
          type="button"
          className={pagina === "cadastro" ? "ativo" : ""}
          onClick={() => setPagina("cadastro")}
        >
          + Novo atendimento
        </button>
      </nav>
    </header>
  );
}

export default Navbar;