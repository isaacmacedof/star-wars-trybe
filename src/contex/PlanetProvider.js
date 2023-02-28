import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';
import searchPlanets from '../helper/SearchPlanets';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetName, setPlanetName] = useState('');
  const [filtredPlanets, setFiltredPlanets] = useState([]);

  useEffect(() => {
    searchPlanets(setPlanets);
  }, []);

  const indexedPlanets = { // se não indexar dá problema com o linter :C //
    planets,
    planetName,
    setPlanetName,
    filtredPlanets,
    setFiltredPlanets,
  };

  return (
    <PlanetContext.Provider value={ indexedPlanets }>
      <div>
        { children }
      </div>
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
