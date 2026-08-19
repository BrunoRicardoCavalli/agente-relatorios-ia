import { useState } from "react";

import {
  cadastrarAtendimento,
  atualizarAtendimento,
} from "../services/api";

function CadastroAtendimento({
  atendimento,
  onVoltar,
  onCadastrado,
}) {
  // =====================================================
  // VERIFICAR SE ESTAMOS EDITANDO
  // =====================================================

  const editando = Boolean(atendimento);

  // =====================================================
  // FORMULÁRIO INICIAL
  // =====================================================

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

  const [erro, setErro] = useState("");

  const [salvando, setSalvando] = useState(false);

  // =====================================================
  // ALTERAR CAMPO
  // =====================================================

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  // =====================================================
  // ENVIAR FORMULÁRIO
  // =====================================================

  async function handleSubmit(event) {
    event.preventDefault();

    setErro("");

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

    if (chamadas < 0 || promessas < 0) {
      setErro(
        "Chamadas e promessas não podem ser negativas."
      );

      return;
    }

    if (promessas > chamadas) {
      setErro(
        "O número de promessas não pode ser maior que o número de chamadas."
      );

      return;
    }

    // ===================================================
    // DADOS PARA API
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
    // CADASTRAR / EDITAR
    // ===================================================

    try {
      setSalvando(true);

      if (editando) {
        await atualizarAtendimento(
          atendimento.id,
          dados
        );
      } else {
        await cadastrarAtendimento(dados);
      }

      // Depois da operação:
      // atualiza a lista e volta ao dashboard.

      if (onCadastrado) {
        await onCadastrado();
      }
    } catch (error) {
      setErro(
        error.message ||
          `Não foi possível ${
            editando
              ? "atualizar"
              : "cadastrar"
          } o atendimento.`
      );
    } finally {
      setSalvando(false);
    }
  }

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <section className="cadastro-container">

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <div className="cadastro-header">

        <div>

          <h2>
            {editando
              ? "Editar atendimento"
              : "Novo atendimento"}
          </h2>

          <p>
            {editando
              ? "Altere os dados do atendimento."
              : "Cadastre um novo atendimento no sistema."}
          </p>

        </div>

      </div>

      {/* =================================================
          ERRO
      ================================================= */}

      {erro && (
        <div className="erro">
          <p>{erro}</p>
        </div>
      )}

      {/* =================================================
          FORMULÁRIO
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="cadastro-form"
      >

        {/* =================================================
            ATENDENTE
        ================================================= */}

        <div className="form-grupo">

          <label htmlFor="atendente">
            Atendente
          </label>

          <input
            id="atendente"
            name="atendente"
            type="text"
            value={formulario.atendente}
            onChange={handleChange}
            placeholder="Nome do atendente"
            disabled={salvando}
          />

        </div>

        {/* =================================================
            DATA
        ================================================= */}

        <div className="form-grupo">

          <label htmlFor="data_atendimento">
            Data do atendimento
          </label>

          <input
            id="data_atendimento"
            name="data_atendimento"
            type="date"
            value={
              formulario.data_atendimento
            }
            onChange={handleChange}
            disabled={salvando}
          />

        </div>

        {/* =================================================
            CHAMADAS / PROMESSAS
        ================================================= */}

        <div className="form-linha">

          <div className="form-grupo">

            <label htmlFor="chamadas">
              Chamadas
            </label>

            <input
              id="chamadas"
              name="chamadas"
              type="number"
              min="0"
              value={formulario.chamadas}
              onChange={handleChange}
              placeholder="Ex.: 50"
              disabled={salvando}
            />

          </div>

          <div className="form-grupo">

            <label htmlFor="promessas">
              Promessas
            </label>

            <input
              id="promessas"
              name="promessas"
              type="number"
              min="0"
              value={formulario.promessas}
              onChange={handleChange}
              placeholder="Ex.: 20"
              disabled={salvando}
            />

          </div>

        </div>

        {/* =================================================
            OBSERVAÇÃO
        ================================================= */}

        <div className="form-grupo">

          <label htmlFor="observacao">
            Observação
          </label>

          <textarea
            id="observacao"
            name="observacao"
            value={formulario.observacao}
            onChange={handleChange}
            placeholder="Digite uma observação..."
            rows="4"
            disabled={salvando}
          />

        </div>

        {/* =================================================
            BOTÕES
        ================================================= */}

        <div className="cadastro-acoes">

          <button
            type="button"
            className="botao-cancelar"
            onClick={onVoltar}
            disabled={salvando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="botao-salvar"
            disabled={salvando}
          >
            {salvando
              ? editando
                ? "Salvando..."
                : "Cadastrando..."
              : editando
              ? "Salvar alterações"
              : "Cadastrar atendimento"}
          </button>

        </div>

      </form>

    </section>
  );
}

export default CadastroAtendimento;