function FiltroPeriodo({ periodo, setPeriodo }) {
  return (
    <div className="filtro-periodo">
      <label htmlFor="periodo">
        Período:
      </label>

      <select
        id="periodo"
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
      >
        <option value="todos">
          Todos
        </option>

        <option value="7dias">
          Últimos 7 dias
        </option>

        <option value="30dias">
          Últimos 30 dias
        </option>

        <option value="90dias">
          Últimos 90 dias
        </option>
      </select>
    </div>
  );
}

export default FiltroPeriodo;