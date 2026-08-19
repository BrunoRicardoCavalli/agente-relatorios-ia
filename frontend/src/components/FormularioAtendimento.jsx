import { useState } from "react";

import {
  cadastrarAtendimento,
  atualizarAtendimento,
} from "../services/api";

function FormularioAtendimento({
  atendimento,
  onCadastroSucesso,
  onCancelar,
}) {
  const modoEdicao = Boolean(atendimento);

  const [formulario, setFormulario] = useState(() => ({
    atendente: atendimento?.atendente || "",

    data_atendimento: atendimento?.data_atendimento
      ? String(atendimento.data_atendimento).substring(0, 10)
      : "",

    chamadas:
      atendimento?.chamadas !== undefined
        ? String(atendimento.chamadas)
        : "",

    promessas:
      atendimento?.promessas !== undefined
        ? String(atendimento.promessas)
        : "",

    observacao: atendimento?.observacao || "",
  }));

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // =====================================================
  // ALTERAR CAMPO
  // =====================================================

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  }

  // =====================================================
  // ENVIAR FORMULÁRIO
  // =====================================================

  async function enviarFormulario(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");

    // ===================================================
    // VALIDAÇÕES
    // ===================================================

    if (!formulario.atendente.trim()) {
      setErro("Informe o nome do atendente.");
      return;
    }

    if (!formulario.data_atendimento) {
      setErro("Informe a data do atendimento.");
      return;
    }

    if (formulario.chamadas === "") {
      setErro("Informe a quantidade de chamadas.");
      return;
    }

    if (formulario.promessas === "") {
      setErro("Informe a quantidade de promessas.");
      return;
    }

    const chamadas = Number(formulario.chamadas);
    const promessas = Number(formulario.promessas);

    if (!Number.isInteger(chamadas)) {
      setErro("A quantidade de chamadas deve ser um número inteiro.");
      return;
    }

    if (!Number.isInteger(promessas)) {
      setErro("A quantidade de promessas deve ser um número inteiro.");
      return;
    }

    if (chamadas < 0) {
      setErro(
        "A quantidade de chamadas não pode ser negativa."
      );
      return;
    }

    if (promessas < 0) {
      setErro(
        "A quantidade de promessas não pode ser negativa."
      );
      return;
    }

    if (promessas > chamadas) {
      setErro(
        "A quantidade de promessas não pode ser maior que a quantidade de chamadas."
      );
      return;
    }

    // ===================================================
    // DADOS
    // ===================================================

    const dados = {
      atendente: formulario.atendente.trim(),

      data_atendimento:
        formulario.data_atendimento,

      chamadas,

      promessas,

      observacao:
        formulario.observacao.trim(),
    };

    // ===================================================
    // SALVAR
    // ===================================================

    try {
      setCarregando(true);

      if (modoEdicao) {
        await atualizarAtendimento(
          atendimento.id,
          dados
        );

        setSucesso(
          "Atendimento atualizado com sucesso!"
        );
      } else {
        await cadastrarAtendimento(dados);

        setSucesso(
          "Atendimento cadastrado com sucesso!"
        );

        setFormulario({
          atendente: "",
          data_atendimento: "",
          chamadas: "",
          promessas: "",
          observacao: "",
        });
      }

      // =================================================
      // AVISAR A PÁGINA
      // =================================================

      if (onCadastroSucesso) {
        await onCadastroSucesso();
      }
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível salvar o atendimento."
      );
    } finally {
      setCarregando(false);
    }
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <section className="formulario-container">

      {/* ================================================
          CABEÇALHO
      ================================================= */}

      <div className="formulario-header">
        <div>

          <h2>
            {modoEdicao
              ? "Editar atendimento"
              : "Novo atendimento"}
          </h2>

          <p>
            {modoEdicao
              ? "Altere os dados do atendimento."
              : "Preencha os dados do atendimento."}
          </p>

        </div>
      </div>

      {/* ================================================
          ERRO
      ================================================= */}

      {erro && (
        <div className="erro">
          <p>{erro}</p>
        </div>
      )}

      {/* ================================================
          SUCESSO
      ================================================= */}

      {sucesso && (
        <div className="sucesso">
          <p>{sucesso}</p>
        </div>
      )}

      {/* ================================================
          FORMULÁRIO
      ================================================= */}

      <form onSubmit={enviarFormulario}>

        <div className="formulario-grid">

          {/* ATENDENTE */}

          <div className="campo">

            <label htmlFor="atendente">
              Atendente
            </label>

            <input
              id="atendente"
              name="atendente"
              type="text"
              value={formulario.atendente}
              onChange={alterarCampo}
              placeholder="Digite o nome do atendente"
            />

          </div>

          {/* DATA */}

          <div className="campo">

            <label htmlFor="data_atendimento">
              Data do atendimento
            </label>

            <input
              id="data_atendimento"
              name="data_atendimento"
              type="date"
              value={formulario.data_atendimento}
              onChange={alterarCampo}
            />

          </div>

          {/* CHAMADAS */}

          <div className="campo">

            <label htmlFor="chamadas">
              Chamadas
            </label>

            <input
              id="chamadas"
              name="chamadas"
              type="number"
              min="0"
              value={formulario.chamadas}
              onChange={alterarCampo}
              placeholder="Ex.: 50"
            />

          </div>

          {/* PROMESSAS */}

          <div className="campo">

            <label htmlFor="promessas">
              Promessas
            </label>

            <input
              id="promessas"
              name="promessas"
              type="number"
              min="0"
              value={formulario.promessas}
              onChange={alterarCampo}
              placeholder="Ex.: 20"
            />

          </div>

        </div>

        {/* OBSERVAÇÃO */}

        <div className="campo">

          <label htmlFor="observacao">
            Observação
          </label>

          <textarea
            id="observacao"
            name="observacao"
            value={formulario.observacao}
            onChange={alterarCampo}
            placeholder="Digite uma observação..."
            rows="4"
          />

        </div>

        {/* ================================================
            AÇÕES
        ================================================= */}

        <div className="formulario-acoes">

          <button
            type="button"
            className="botao-cancelar"
            onClick={onCancelar}
            disabled={carregando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="botao-salvar"
            disabled={carregando}
          >
            {carregando
              ? "Salvando..."
              : modoEdicao
                ? "Salvar alterações"
                : "Cadastrar atendimento"}
          </button>

        </div>

      </form>

    </section>
  );
}

export default FormularioAtendimento;