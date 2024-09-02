import React from 'react';
import PlanetProvider from './contex/PlanetProvider';
import FormFilter from './components/FormFilter';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <FormFilter />
      <Table />
    </PlanetProvider>
  );
}

export default App;
