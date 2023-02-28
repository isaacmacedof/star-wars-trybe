import React, { useContext } from 'react';
import PlanetContext from '../contex/PlanetContext';

function FormFilter() {
  const {
    planetName,
    setPlanetName,
  } = useContext(PlanetContext);

  return (
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
  );
}

export default FormFilter;
