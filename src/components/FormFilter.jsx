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
  });

  const clickButton = () => {
    setNumberFilter([...numberFilter, selected]);
    setSelected({
      column: 'population',
      condition: 'maior que',
      value: '0',
    });
  };

  const filterOptions = (op) => !numberFilter
    .find((filtro) => op === filtro.column);

  console.log(numberFilter);
  console.log(selected);

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
          onClick={ clickButton }
        >
          FILTRAR
        </button>
      </div>
    </div>
  );
}

export default FormFilter;
