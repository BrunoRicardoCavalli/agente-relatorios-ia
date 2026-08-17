import { useEffect, useState } from "react";

import DashboardCard from "./components/DashboardCard";
import AtendimentoTable from "./components/AtendimentoTable";
import DesempenhoAtendentes from "./components/DesempenhoAtendentes";
import GraficoDesempenho from "./components/GraficoDesempenho";
import FiltroPeriodo from "./components/FiltroPeriodo";

import CadastroAtendimento from "./pages/CadastroAtendimento";

import {
  listarAtendimentos,
} from "./services/api";

import "./App.css";

function App() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [periodo, setPeriodo] = useState("todos");

  // =====================================================
  // CONTROLE DA PÁGINA
  // =====================================================

  const [pagina, setPagina] = useState("dashboard");

  // =====================================================
  // CARREGAR ATENDIMENTOS
  // =====================================================

  async function carregarAtendimentos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await listarAtendimentos();

      if (Array.isArray(resposta)) {
        setAtendimentos(resposta);
      } else {
        setAtendimentos([]);
        setErro("Formato de resposta inválido.");
      }
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível carregar os atendimentos."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // CARREGAR AO ABRIR O SISTEMA
  // =====================================================

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await listarAtendimentos();

        if (!ativo) {
          return;
        }

        if (Array.isArray(resposta)) {
          setAtendimentos(resposta);
        } else {
          setAtendimentos([]);
          setErro("Formato de resposta inválido.");
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.message ||
              "Não foi possível carregar os atendimentos."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  // =====================================================
  // FILTRO POR PERÍODO
  // =====================================================

  const atendimentosFiltrados = atendimentos.filter(
    (atendimento) => {

      // -----------------------------------------------
      // TODOS
      // -----------------------------------------------

      if (periodo === "todos") {
        return true;
      }

      // -----------------------------------------------
      // VERIFICA DATA
      // -----------------------------------------------

      if (!atendimento.data_atendimento) {
        return false;
      }

      /*
        A API retorna:

        2026-08-03T03:00:00.000Z
        2026-07-30T03:00:00.000Z
        2026-07-24T03:00:00.000Z

        Pegamos somente YYYY-MM-DD.
      */

      const dataAtendimento = String(
        atendimento.data_atendimento
      ).substring(0, 10);

      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
          dataAtendimento
        )
      ) {
        return false;
      }

      // -----------------------------------------------
      // PEGAR DATAS VÁLIDAS
      // -----------------------------------------------

      const datas = atendimentos
        .map((item) => {

          if (!item.data_atendimento) {
            return null;
          }

          const data = String(
            item.data_atendimento
          ).substring(0, 10);

          if (
            !/^\d{4}-\d{2}-\d{2}$/.test(data)
          ) {
            return null;
          }

          return data;
        })
        .filter(Boolean);

      if (datas.length === 0) {
        return false;
      }

      // -----------------------------------------------
      // DATA MAIS RECENTE
      // -----------------------------------------------

      const dataReferencia = [...datas]
        .sort()
        .at(-1);

      // -----------------------------------------------
      // QUANTIDADE DE DIAS
      // -----------------------------------------------

      let quantidadeDias;

      if (periodo === "7dias") {
        quantidadeDias = 7;
      } else if (periodo === "30dias") {
        quantidadeDias = 30;
      } else if (periodo === "90dias") {
        quantidadeDias = 90;
      } else {
        return true;
      }

      // -----------------------------------------------
      // CALCULAR DATA LIMITE
      // -----------------------------------------------

      const referencia = new Date(
        `${dataReferencia}T00:00:00`
      );

      referencia.setDate(
        referencia.getDate() -
          quantidadeDias
      );

      const ano =
        referencia.getFullYear();

      const mes = String(
        referencia.getMonth() + 1
      ).padStart(2, "0");

      const dia = String(
        referencia.getDate()
      ).padStart(2, "0");

      const dataLimite =
        `${ano}-${mes}-${dia}`;

      // -----------------------------------------------
      // COMPARAÇÃO
      // -----------------------------------------------

      return (
        dataAtendimento >= dataLimite &&
        dataAtendimento <= dataReferencia
      );
    }
  );

  // =====================================================
  // TOTAL DE CHAMADAS
  // =====================================================

  const totalChamadas =
    atendimentosFiltrados.reduce(
      (total, atendimento) => {
        return (
          total +
          Number(
            atendimento.chamadas || 0
          )
        );
      },
      0
    );

  // =====================================================
  // TOTAL DE PROMESSAS
  // =====================================================

  const totalPromessas =
    atendimentosFiltrados.reduce(
      (total, atendimento) => {
        return (
          total +
          Number(
            atendimento.promessas || 0
          )
        );
      },
      0
    );

  // =====================================================
  // TAXA DE PROMESSAS
  // =====================================================

  const taxaPromessas =
    totalChamadas > 0
      ? (
          (totalPromessas /
            totalChamadas) *
          100
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // RENDERIZAÇÃO
  // =====================================================

  return (
    <div className="app">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="header">

        <div>
          <h1>
            🤖 Agente Relatórios IA
          </h1>

          <p>
            Dashboard de acompanhamento
            dos atendimentos
          </p>
        </div>

        {/* =================================================
            BOTÃO NOVO ATENDIMENTO
        ================================================= */}

        {pagina === "dashboard" && (
          <button
            className="botao-novo"
            onClick={() =>
              setPagina("cadastro")
            }
          >
            + Novo atendimento
          </button>
        )}

      </header>

      {/* =================================================
          CONTEÚDO
      ================================================= */}

      <div className="container">

        {/* =================================================
            PÁGINA DE CADASTRO
        ================================================= */}

        {pagina === "cadastro" && (
          <CadastroAtendimento
            onVoltar={() =>
              setPagina("dashboard")
            }
            onCadastrado={async () => {

              await carregarAtendimentos();

              setPeriodo("todos");

              setPagina("dashboard");
            }}
          />
        )}

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {pagina === "dashboard" && (
          <>
            {/* =============================================
                CARREGANDO
            ============================================== */}

            {carregando && (
              <div className="mensagem">
                <p>
                  Carregando atendimentos...
                </p>
              </div>
            )}

            {/* =============================================
                ERRO
            ============================================== */}

            {erro && (
              <div className="erro">
                <p>
                  Erro: {erro}
                </p>
              </div>
            )}

            {/* =============================================
                DASHBOARD PRINCIPAL
            ============================================== */}

            {!carregando &&
              !erro && (
                <main>

                  {/* =======================================
                      FILTRO
                  ======================================== */}

                  <div className="dashboard-toolbar">

                    <FiltroPeriodo
                      periodo={periodo}
                      setPeriodo={
                        setPeriodo
                      }
                    />

                  </div>

                  {/* =======================================
                      CARDS
                  ======================================== */}

                  <section className="cards">

                    <DashboardCard
                      titulo="Total de atendimentos"
                      valor={
                        atendimentosFiltrados.length
                      }
                    />

                    <DashboardCard
                      titulo="Total de chamadas"
                      valor={
                        totalChamadas
                      }
                    />

                    <DashboardCard
                      titulo="Total de promessas"
                      valor={
                        totalPromessas
                      }
                    />

                    <DashboardCard
                      titulo="Taxa de promessas"
                      valor={`${taxaPromessas}%`}
                    />

                  </section>

                  {/* =======================================
                      DESEMPENHO
                  ======================================== */}

                  <DesempenhoAtendentes
                    atendimentos={
                      atendimentosFiltrados
                    }
                  />

                  {/* =======================================
                      GRÁFICO
                  ======================================== */}

                  <GraficoDesempenho
                    atendimentos={
                      atendimentosFiltrados
                    }
                  />

                  {/* =======================================
                      TABELA
                  ======================================== */}

                  <section className="tabela-container">

                    <div className="tabela-header">

                      <div>

                        <h2>
                          Atendimentos
                        </h2>

                        <span>
                          {
                            atendimentosFiltrados.length
                          }{" "}
                          registros encontrados
                        </span>

                      </div>

                    </div>

                    <AtendimentoTable
                      atendimentos={
                        atendimentosFiltrados
                      }
                    />

                  </section>

                </main>
              )}

          </>
        )}

      </div>

    </div>
  );
}

export default App;