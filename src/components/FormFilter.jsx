/* eslint-disable react/jsx-max-depth */
import React, { useContext, useState } from 'react';
import PlanetContext from '../contex/PlanetContext';
import '../styles/FormFilter.css';

function FormFilter() {
  const {
    planetName,
    numberFilter,
    setPlanetName,
    setNumberFilter,
    setOrder,
  } = useContext(PlanetContext);

  const opitions = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
    id: 0,
  });

  const [preview, setPreview] = useState({
    column: 'population',
    direction: 'ASC',
  });

  const filterOptions = (op) => !numberFilter
    .find((filtro) => op === filtro.column);

  const clickButtonFilter = () => {
    setNumberFilter([...numberFilter, selected]);

    const retorno = opitions.filter(filterOptions);

    setSelected({
      column: retorno[0],
      condition: 'maior que',
      value: '0',
      id: selected.id + 1,
    });
  };

  const clickButtonRemoveAllFilter = () => {
    setNumberFilter([]);
    setOrder({});
    setPlanetName('');
  };

  const clickButtonRemoveSelectedFilter = (e) => {
    const ids = e.target.id;

    const removedFilter = numberFilter.filter((filter) => Number(ids) !== filter.id);

    setNumberFilter(removedFilter);
  };

  const clickButtonOrderSubmit = () => {
    setOrder(preview);
  };

  return (
    <div>
      <div className="container-header">
        <h1>Busque por planetas do Universo StarWars</h1>
      </div>
      <div className="container-filters">
        <div className="container-filters-name">
          <input
            value={ planetName }
            data-testid="name-filter"
            placeholder="Digite aqui o nome de um planeta do Universo StarWars"
            onChange={ (e) => {
              setPlanetName(e.target.value);
            } }
          />
        </div>
        <div className="container-filters-numeric">
          <label htmlFor="column">
            {'Colunas: '}
            <select
              data-testid="column-filter"
              name="column"
              value={ selected.column }
              onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
            >
              {opitions
                .filter(filterOptions).map((column) => (
                  <option data-testid="filterOptions" key={ column } value={ column }>
                    { column }
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="condition">
            {'Condição: '}
            <select
              data-testid="comparison-filter"
              name="condition"
              value={ selected.condition }
              onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
            >
              <option>maior que</option>
              <option>menor que</option>
              <option>igual a</option>
            </select>
          </label>
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
            Filtrar
          </button>
          <button
            data-testid="button-remove-filters"
            onClick={ clickButtonRemoveAllFilter }
          >
            Remover todas as filtragens
          </button>
        </div>
        <div className="container-filters-order">
          <select
            data-testid="column-sort"
            value={ preview.column }
            onChange={ (e) => setPreview({ ...preview, column: e.target.value }) }
          >
            { opitions.map((column) => (
              <option key={ column } value={ column }>
                { column }
              </option>
            )) }
          </select>
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="Opition"
            onClick={ (e) => setPreview({ ...preview, direction: e.target.value }) }
          />
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="Opition"
            onClick={ (e) => setPreview({ ...preview, direction: e.target.value }) }
          />
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ clickButtonOrderSubmit }
          >
            Ordenar
          </button>
        </div>
      </div>
      <div className="filter-online-container">
        { numberFilter.map((filter, index) => (
          <div className="filter-online" key={ index }>
            <p data-testid="filter" className="text-filter-online">
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
          </div>
        )) }
      </div>
    </div>
  );
}

export default FormFilter;
