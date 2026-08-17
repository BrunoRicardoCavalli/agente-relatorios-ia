function DesempenhoAtendentes({ atendimentos }) {
  const desempenho = atendimentos.reduce((resultado, atendimento) => {
    const nome = atendimento.atendente || "Sem nome";

    if (!resultado[nome]) {
      resultado[nome] = {
        atendente: nome,
        chamadas: 0,
        promessas: 0,
      };
    }

    resultado[nome].chamadas += Number(atendimento.chamadas || 0);
    resultado[nome].promessas += Number(atendimento.promessas || 0);

    return resultado;
  }, {});

  const atendentes = Object.values(desempenho).sort(
    (a, b) => b.chamadas - a.chamadas
  );

  if (atendentes.length === 0) {
    return (
      <div className="mensagem">
        <p>Nenhum dado de desempenho encontrado.</p>
      </div>
    );
  }

  return (
    <section className="desempenho-container">
      <div className="desempenho-header">
        <div>
          <h2>Desempenho por atendente</h2>
          <span>
            Comparativo de chamadas e promessas
          </span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Atendente</th>
              <th className="coluna-numero">Chamadas</th>
              <th className="coluna-numero">Promessas</th>
              <th className="coluna-numero">Taxa</th>
            </tr>
          </thead>

          <tbody>
            {atendentes.map((atendente) => {
              const taxa =
                atendente.chamadas > 0
                  ? (
                      (atendente.promessas / atendente.chamadas) *
                      100
                    ).toFixed(1)
                  : "0.0";

              return (
                <tr key={atendente.atendente}>
                  <td>{atendente.atendente}</td>

                  <td className="coluna-numero">
                    {atendente.chamadas}
                  </td>

                  <td className="coluna-numero">
                    {atendente.promessas}
                  </td>

                  <td className="coluna-numero">
                    {taxa}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DesempenhoAtendentes;