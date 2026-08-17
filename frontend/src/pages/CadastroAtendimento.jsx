import { useState } from "react";
import { criarAtendimento } from "../services/api";

function CadastroAtendimento({ onVoltar, onCadastrado }) {
  const [formulario, setFormulario] = useState({
    atendente: "",
    data_atendimento: "",
    chamadas: "",
    promessas: "",
    observacao: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
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

    const chamadas = Number(formulario.chamadas);
    const promessas = Number(formulario.promessas);

    if (!Number.isInteger(chamadas) || !Number.isInteger(promessas)) {
      setErro("Chamadas e promessas devem ser números inteiros.");
      return;
    }

    if (chamadas < 0 || promessas < 0) {
      setErro("Chamadas e promessas não podem ser negativas.");
      return;
    }

    if (promessas > chamadas) {
      setErro(
        "O número de promessas não pode ser maior que o número de chamadas."
      );
      return;
    }

    try {
      setSalvando(true);

      await criarAtendimento({
        atendente: formulario.atendente.trim(),
        data_atendimento: formulario.data_atendimento,
        chamadas,
        promessas,
        observacao: formulario.observacao.trim(),
      });

      setSucesso("Atendimento cadastrado com sucesso!");

      setFormulario({
        atendente: "",
        data_atendimento: "",
        chamadas: "",
        promessas: "",
        observacao: "",
      });

      if (onCadastrado) {
        await onCadastrado();
      }
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <main className="cadastro-page">
      <section className="cadastro-container">
        <div className="cadastro-header">
          <div>
            <h2>Novo atendimento</h2>

            <p>
              Cadastre um novo atendimento no sistema.
            </p>
          </div>

          <button
            type="button"
            className="botao-voltar"
            onClick={onVoltar}
          >
            ← Voltar
          </button>
        </div>

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

        <form
          className="cadastro-form"
          onSubmit={handleSubmit}
        >
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
              placeholder="Digite o nome do atendente"
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="data_atendimento">
              Data do atendimento
            </label>

            <input
              id="data_atendimento"
              name="data_atendimento"
              type="date"
              value={formulario.data_atendimento}
              onChange={handleChange}
            />
          </div>

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
              />
            </div>
          </div>

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
              rows="5"
            />
          </div>

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
                ? "Salvando..."
                : "Cadastrar atendimento"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CadastroAtendimento;