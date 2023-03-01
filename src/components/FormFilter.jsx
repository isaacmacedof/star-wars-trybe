import React, { useContext, useState } from 'react';
import PlanetContext from '../contex/PlanetContext';

function FormFilter() {
  const {
    planetName,
    numberFilter,
    setPlanetName,
    setNumberFilter,
  } = useContext(PlanetContext);

  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
    id: 0,
  });

  const filterOptions = (op) => !numberFilter
    .find((filtro) => op === filtro.column);

  const clickButtonFilter = () => {
    setNumberFilter([...numberFilter, selected]);

    const retorno = ['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'].filter(filterOptions);

    setSelected({
      column: retorno[0],
      condition: 'maior que',
      value: '0',
      id: selected.id + 1,
    });
  };

  const clickButtonRemoveAllFilter = () => {
    setNumberFilter([]);
  };

  const clickButtonRemoveSelectedFilter = (e) => {
    const ids = e.target.id;

    const removedFilter = numberFilter.filter((filter) => Number(ids) !== filter.id);

    setNumberFilter(removedFilter);
  };

  console.log(numberFilter);

  return (
    <div>
      <div>
        <h1>Projeto Star Wars - Trybe</h1>
        <input
          value={ planetName }
          data-testid="name-filter"
          placeholder="Insert a name"
          onChange={ (e) => {
            setPlanetName(e.target.value);
          } }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          value={ selected.column }
          onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
        >
          {['population',
            'orbital_period',
            'diameter',
            'rotation_period',
            'surface_water']
            .filter(filterOptions).map((column) => (
              <option key={ column } value={ column }>
                { column }
              </option>
            ))}
        </select>
        <select
          data-testid="comparison-filter"
          value={ selected.condition }
          onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          placeholder="Insert a number"
          data-testid="value-filter"
          type="number"
          name="filterNumber"
          value={ selected.value }
          onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
        />
        <button
          data-testid="button-filter"
          onClick={ clickButtonFilter }
        >
          FILTRAR
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ clickButtonRemoveAllFilter }
        >
          REMOVER FILTROS
        </button>
      </div>
      <div>
        { numberFilter.map((filter, index) => (
          <p key={ index } data-testid="filter">
            { filter.column }
            {' '}
            { filter.condition }
            {' '}
            { filter.value }
            {' '}
            <button
              id={ filter.id }
              onClick={ clickButtonRemoveSelectedFilter }
            >
              del
            </button>
          </p>
        )) }
      </div>
    </div>
  );
}

export default FormFilter;
