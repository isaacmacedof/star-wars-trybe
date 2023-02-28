const searchPlanets = async (set) => {
  const URL = 'https://swapi.dev/api/planets';
  const result = await fetch(URL);
  const data = await result.json();
  const planets = data.results.map((planet) => {
    const { residents, ...truePlanets } = planet;
    return truePlanets;
  });
  set(planets);
};

export default searchPlanets;
