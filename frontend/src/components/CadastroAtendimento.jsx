import { useState } from "react";

function CadastroAtendimento({ onCadastrar, onCancelar }) {
  const [formulario, setFormulario] = useState({
    atendente: "",
    data_atendimento: "",
    chamadas: "",
    promessas: "",
    observacao: "",
  });

  const [erro, setErro] = useState("");
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

    if (
      Number(formulario.chamadas) < 0 ||
      Number(formulario.promessas) < 0
    ) {
      setErro("Chamadas e promessas não podem ser negativas.");
      return;
    }

    if (Number(formulario.promessas) > Number(formulario.chamadas)) {
      setErro(
        "O número de promessas não pode ser maior que o número de chamadas."
      );
      return;
    }

    try {
      setSalvando(true);

      await onCadastrar({
        atendente: formulario.atendente.trim(),
        data_atendimento: formulario.data_atendimento,
        chamadas: Number(formulario.chamadas),
        promessas: Number(formulario.promessas),
        observacao: formulario.observacao.trim(),
      });
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <section className="cadastro-container">
      <div className="cadastro-header">
        <div>
          <h2>Novo atendimento</h2>
          <p>Cadastre um novo atendimento no sistema.</p>
        </div>
      </div>

      {erro && (
        <div className="erro">
          <p>{erro}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="cadastro-form">
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
            rows="4"
          />
        </div>

        <div className="cadastro-acoes">
          <button
            type="button"
            className="botao-cancelar"
            onClick={onCancelar}
            disabled={salvando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="botao-salvar"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Cadastrar atendimento"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CadastroAtendimento;