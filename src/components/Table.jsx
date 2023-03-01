import React, { useContext } from 'react';
import PlanetContext from '../contex/PlanetContext';

function Table() {
  const { planets, planetName, numberFilter } = useContext(PlanetContext);

  const filtred = () => {
    const filterByName = planets.filter((e) => e.name
      .toUpperCase().includes(planetName.toUpperCase()));

    const filterByNumber = filterByName.filter((p) => {
      const filterResults = numberFilter.map(({ column, condition, value }) => {
        switch (condition) {
        case 'maior que':
          return Number(p[column]) > Number(value);
        case 'menor que':
          return Number(p[column]) < Number(value);
        case 'igual a':
          return Number(p[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterResults.every((el) => el);
    });
    return filterByNumber;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { filtred().map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              <ul>
                {
                  planet
                    .films
                    .map((e) => <li key={ e }>{ e }</li>)
                }
              </ul>
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        )) }
      </tbody>
    </table>
  );
}

export default Table;
