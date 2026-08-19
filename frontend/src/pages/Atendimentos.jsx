import { useState } from "react";

import AtendimentoTable from "../components/AtendimentoTable";

function Atendimentos({
  atendimentos,
  onEditar,
  onExcluir,
  onNovo,
}) {
  const [busca, setBusca] = useState("");

  const atendimentosFiltrados = atendimentos.filter(
    (atendimento) => {
      const nome = String(
        atendimento.atendente || ""
      ).toLowerCase();

      return nome.includes(
        busca.toLowerCase().trim()
      );
    }
  );

  return (
    <main className="atendimentos-page">

      <section className="tabela-container">

        {/* ==========================================
            CABEÇALHO
        =========================================== */}

        <div className="tabela-header">

          <div>
            <h2>Atendimentos</h2>

            <span>
              {atendimentosFiltrados.length}{" "}
              registros encontrados
            </span>
          </div>

          <button
            type="button"
            className="botao-novo"
            onClick={onNovo}
          >
            + Novo atendimento
          </button>

        </div>

        {/* ==========================================
            BUSCA
        =========================================== */}

        <div className="busca-atendimentos">

          <label htmlFor="busca-atendente">
            Buscar atendente
          </label>

          <input
            id="busca-atendente"
            type="text"
            value={busca}
            onChange={(event) =>
              setBusca(event.target.value)
            }
            placeholder="Digite o nome do atendente..."
          />

        </div>

        {/* ==========================================
            TABELA
        =========================================== */}

        <AtendimentoTable
          atendimentos={atendimentosFiltrados}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />

      </section>

    </main>
  );
}

export default Atendimentos;