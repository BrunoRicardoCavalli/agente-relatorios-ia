import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function GraficoDesempenho({ atendimentos }) {
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

  const dados = Object.values(desempenho).sort(
    (a, b) => b.chamadas - a.chamadas
  );

  if (dados.length === 0) {
    return (
      <div className="mensagem">
        <p>Nenhum dado disponível para o gráfico.</p>
      </div>
    );
  }

  return (
    <section className="grafico-container">
      <div className="grafico-header">
        <div>
          <h2>Chamadas x Promessas</h2>
          <span>
            Comparativo de desempenho por atendente
          </span>
        </div>
      </div>

      <div className="grafico">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={dados}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="atendente"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={80}
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="chamadas"
              name="Chamadas"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="promessas"
              name="Promessas"
              fill="#16a34a"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default GraficoDesempenho;