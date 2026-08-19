import { useEffect, useState } from "react";

import DashboardCard from "./components/DashboardCard";
import AtendimentoTable from "./components/AtendimentoTable";
import DesempenhoAtendentes from "./components/DesempenhoAtendentes";
import GraficoDesempenho from "./components/GraficoDesempenho";
import FiltroPeriodo from "./components/FiltroPeriodo";

import CadastroAtendimento from "./pages/CadastroAtendimento";

import {
  listarAtendimentos,
  excluirAtendimento,
} from "./services/api";

import "./App.css";

function App() {
  // =====================================================
  // ESTADOS
  // =====================================================

  const [atendimentos, setAtendimentos] = useState([]);

  const [carregando, setCarregando] =
    useState(true);

  const [erro, setErro] = useState("");

  const [periodo, setPeriodo] =
    useState("todos");

  // Página atual
  const [pagina, setPagina] =
    useState("dashboard");

  // Atendimento que está sendo editado
  const [
    atendimentoEditando,
    setAtendimentoEditando,
  ] = useState(null);

  // =====================================================
  // CARREGAR ATENDIMENTOS
  // =====================================================

  async function carregarAtendimentos() {
    setCarregando(true);
    setErro("");

    try {
      const resposta =
        await listarAtendimentos();

      if (Array.isArray(resposta)) {
        setAtendimentos(resposta);
      } else {
        setAtendimentos([]);
        setErro(
          "Formato de resposta inválido."
        );
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
  // CARREGAR AO ABRIR
  // =====================================================

  useEffect(() => {
    let ativo = true;

    async function carregarInicial() {
      try {
        const resposta =
          await listarAtendimentos();

        if (!ativo) {
          return;
        }

        if (Array.isArray(resposta)) {
          setAtendimentos(resposta);
        } else {
          setAtendimentos([]);
          setErro(
            "Formato de resposta inválido."
          );
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

    carregarInicial();

    return () => {
      ativo = false;
    };
  }, []);

  // =====================================================
  // ABRIR NOVO CADASTRO
  // =====================================================

  function abrirNovoAtendimento() {
    setAtendimentoEditando(null);
    setPagina("cadastro");
  }

  // =====================================================
  // ABRIR EDIÇÃO
  // =====================================================

  function editarAtendimento(atendimento) {
    setAtendimentoEditando(atendimento);
    setPagina("cadastro");
  }

  // =====================================================
  // CANCELAR CADASTRO / EDIÇÃO
  // =====================================================

  function voltarDashboard() {
    setAtendimentoEditando(null);
    setPagina("dashboard");
  }

  // =====================================================
  // APÓS CADASTRAR / EDITAR
  // =====================================================

  async function finalizarCadastro() {
    await carregarAtendimentos();

    setAtendimentoEditando(null);

    setPeriodo("todos");

    setPagina("dashboard");
  }

  // =====================================================
  // EXCLUIR
  // =====================================================

  async function excluir(atendimento) {
    const confirmar = window.confirm(
      `Deseja realmente excluir o atendimento de ${atendimento.atendente}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      await excluirAtendimento(
        atendimento.id
      );

      await carregarAtendimentos();
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível excluir o atendimento."
      );
    }
  }

  // =====================================================
  // FILTRO POR PERÍODO
  // =====================================================

  const atendimentosFiltrados =
    atendimentos.filter(
      (atendimento) => {
        if (periodo === "todos") {
          return true;
        }

        if (!atendimento.data_atendimento) {
          return false;
        }

        const dataAtendimento =
          String(
            atendimento.data_atendimento
          ).substring(0, 10);

        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(
            dataAtendimento
          )
        ) {
          return false;
        }

        const datas = atendimentos
          .map((item) => {
            if (
              !item.data_atendimento
            ) {
              return null;
            }

            const data =
              String(
                item.data_atendimento
              ).substring(0, 10);

            if (
              !/^\d{4}-\d{2}-\d{2}$/.test(
                data
              )
            ) {
              return null;
            }

            return data;
          })
          .filter(Boolean);

        if (datas.length === 0) {
          return false;
        }

        const dataReferencia =
          [...datas].sort().at(-1);

        let quantidadeDias;

        if (periodo === "7dias") {
          quantidadeDias = 7;
        } else if (
          periodo === "30dias"
        ) {
          quantidadeDias = 30;
        } else if (
          periodo === "90dias"
        ) {
          quantidadeDias = 90;
        } else {
          return true;
        }

        const referencia =
          new Date(
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

        return (
          dataAtendimento >=
            dataLimite &&
          dataAtendimento <=
            dataReferencia
        );
      }
    );

  // =====================================================
  // TOTAIS
  // =====================================================

  const totalChamadas =
    atendimentosFiltrados.reduce(
      (total, atendimento) =>
        total +
        Number(
          atendimento.chamadas || 0
        ),
      0
    );

  const totalPromessas =
    atendimentosFiltrados.reduce(
      (total, atendimento) =>
        total +
        Number(
          atendimento.promessas || 0
        ),
      0
    );

  const taxaPromessas =
    totalChamadas > 0
      ? (
          (totalPromessas /
            totalChamadas) *
          100
        ).toFixed(1)
      : "0.0";

  // =====================================================
  // INTERFACE
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

        {pagina === "dashboard" && (
          <button
            className="botao-novo"
            onClick={
              abrirNovoAtendimento
            }
          >
            + Novo atendimento
          </button>
        )}

      </header>

      {/* =================================================
          CONTAINER
      ================================================= */}

      <div className="container">

        {/* =================================================
            CADASTRO / EDIÇÃO
        ================================================= */}

        {pagina === "cadastro" && (
          <CadastroAtendimento
            atendimento={
              atendimentoEditando
            }
            onVoltar={
              voltarDashboard
            }
            onCadastrado={
              finalizarCadastro
            }
          />
        )}

        {/* =================================================
            DASHBOARD
        ================================================= */}

        {pagina === "dashboard" && (
          <>
            {carregando && (
              <div className="mensagem">
                <p>
                  Carregando
                  atendimentos...
                </p>
              </div>
            )}

            {erro && (
              <div className="erro">
                <p>
                  Erro: {erro}
                </p>
              </div>
            )}

            {!carregando &&
              !erro && (
                <main>

                  {/* FILTRO */}

                  <div className="dashboard-toolbar">

                    <FiltroPeriodo
                      periodo={periodo}
                      setPeriodo={
                        setPeriodo
                      }
                    />

                  </div>

                  {/* CARDS */}

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

                  {/* DESEMPENHO */}

                  <DesempenhoAtendentes
                    atendimentos={
                      atendimentosFiltrados
                    }
                  />

                  {/* GRÁFICO */}

                  <GraficoDesempenho
                    atendimentos={
                      atendimentosFiltrados
                    }
                  />

                  {/* TABELA */}

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
                          registros
                          encontrados
                        </span>

                      </div>

                    </div>

                    <AtendimentoTable
                      atendimentos={
                        atendimentosFiltrados
                      }
                      onEditar={
                        editarAtendimento
                      }
                      onExcluir={
                        excluir
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