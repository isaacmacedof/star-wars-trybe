import React from 'react';
import { render } from '@testing-library/react';
import PlanetProvider from '../contex/PlanetProvider';

export default function renderWithProvider(component) {
  return ({
    ...render(
      <PlanetProvider>
        {component}
      </PlanetProvider>,
    ),
  });
}
