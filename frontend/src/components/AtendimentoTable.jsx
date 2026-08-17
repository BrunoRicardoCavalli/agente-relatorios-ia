function AtendimentoTable({ atendimentos }) {
  if (atendimentos.length === 0) {
    return (
      <div className="mensagem">
        <p>Nenhum atendimento encontrado.</p>
      </div>
    );
  }

  return (
    <div className="tabela-scroll">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Atendente</th>
            <th>Data</th>
            <th>Chamadas</th>
            <th>Promessas</th>
            <th>Observação</th>
          </tr>
        </thead>

        <tbody>
          {atendimentos.map((atendimento) => (
            <tr key={atendimento.id}>
              <td>{atendimento.id}</td>

              <td>{atendimento.atendente}</td>

              <td>
                {new Date(
                  atendimento.data_atendimento
                ).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </td>

              <td>{atendimento.chamadas}</td>

              <td>{atendimento.promessas}</td>

              <td>{atendimento.observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AtendimentoTable;