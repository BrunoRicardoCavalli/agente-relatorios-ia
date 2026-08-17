import { useState } from "react";
import { cadastrarAtendimento } from "../services/api";

function FormularioAtendimento({ onCadastroSucesso, onCancelar }) {
  const [formulario, setFormulario] = useState({
    atendente: "",
    data_atendimento: "",
    chamadas: "",
    promessas: "",
    observacao: "",
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  }

  async function enviarFormulario(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");

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

    if (Number(formulario.chamadas) < 0) {
      setErro("A quantidade de chamadas não pode ser negativa.");
      return;
    }

    if (Number(formulario.promessas) < 0) {
      setErro("A quantidade de promessas não pode ser negativa.");
      return;
    }

    if (
      Number(formulario.promessas) >
      Number(formulario.chamadas)
    ) {
      setErro(
        "A quantidade de promessas não pode ser maior que a quantidade de chamadas."
      );
      return;
    }

    try {
      setCarregando(true);

      const dados = {
        atendente: formulario.atendente.trim(),
        data_atendimento: formulario.data_atendimento,
        chamadas: Number(formulario.chamadas),
        promessas: Number(formulario.promessas),
        observacao: formulario.observacao.trim(),
      };

      await cadastrarAtendimento(dados);

      setSucesso("Atendimento cadastrado com sucesso!");

      setFormulario({
        atendente: "",
        data_atendimento: "",
        chamadas: "",
        promessas: "",
        observacao: "",
      });

      if (onCadastroSucesso) {
        await onCadastroSucesso();
      }
    } catch (error) {
      setErro(
        error.message ||
          "Não foi possível cadastrar o atendimento."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="formulario-container">
      <div className="formulario-header">
        <div>
          <h2>Novo atendimento</h2>

          <p>
            Preencha os dados do atendimento.
          </p>
        </div>
      </div>

      <form onSubmit={enviarFormulario}>
        {erro && (
          <div className="erro">
            <p>{erro}</p>
          </div>
        )}

        {sucesso && (
          <div className="sucesso">
            <p>{sucesso}</p>
          </div>
        )}

        <div className="formulario-grid">
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
              ? "Cadastrando..."
              : "Cadastrar atendimento"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioAtendimento;