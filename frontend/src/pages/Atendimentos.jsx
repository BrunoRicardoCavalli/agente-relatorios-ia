import AtendimentoTable from "../components/AtendimentoTable";

function Atendimentos({
  atendimentos,
  onEditar,
  onExcluir,
}) {
  return (
    <section className="tabela-container">

      <div className="tabela-header">
        <div>
          <h2>Atendimentos</h2>

          <span>
            {atendimentos.length} registros encontrados
          </span>
        </div>
      </div>

      <AtendimentoTable
        atendimentos={atendimentos}
        onEditar={onEditar}
        onExcluir={onExcluir}
      />

    </section>
  );
}

export default Atendimentos;