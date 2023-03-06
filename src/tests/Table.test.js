import React from 'react';
import { screen } from '@testing-library/react';
import mockFetch from "../../cypress/mocks/fetch"
import { waitFor } from '@testing-library/react';
import renderWithProvider from '../helperTest/renderWithProvider';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testing all function', () => {
  it('Testing the filter in name and fetch', async () => {
    global.fetch=jest.fn(mockFetch)
    renderWithProvider(<App />);
  
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')
  
    const nameInput = screen.getByTestId('name-filter');
    const selectFilter = screen.getByTestId('column-filter')
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const buttonFIlter = screen.getByTestId('button-filter');
    const buttonRemoveFilter = screen.getByTestId('button-remove-filters');
  
    await waitFor(() => {
      expect(screen.getByText('Alderaan')).toBeInTheDocument()
    })
  
    const allPlanets = screen.getAllByTestId('planet-name');

    expect(allPlanets.length).toBe(10)
  
    userEvent.type(nameInput, 'Tatooine');
    expect(nameInput).toHaveValue('Tatooine');

    const onePlanet = screen.getAllByTestId('planet-name');

    expect(onePlanet.length).toBe(1)
  });

  it('Testing the filter number', async () => {
    global.fetch=jest.fn(mockFetch);
    renderWithProvider(<App />);

    const selectFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const buttonFIlter = screen.getByTestId('button-filter');

    await waitFor(() => {
      expect(screen.getByText('Alderaan')).toBeInTheDocument();
    })

    const allPlanets = screen.getAllByTestId('planet-name');

    expect(allPlanets.length).toBe(10);

    userEvent.selectOptions(selectFilter, 'orbital_period');
    expect(selectFilter).toHaveValue('orbital_period');

    expect(compareFilter).toHaveValue('maior que');

    userEvent.type(valueFilterInput, '400');
    expect(valueFilterInput).toHaveValue(400);

    userEvent.click(buttonFIlter);

    const filtredAllPlanets = screen.getAllByTestId('planet-name');
    expect(filtredAllPlanets.length).toBe(5);
  })

  it('Testing the filter number (menor que)', async () => {
    global.fetch=jest.fn(mockFetch);
    renderWithProvider(<App />);

    const selectFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const buttonFIlter = screen.getByTestId('button-filter');

    await waitFor(() => {
      expect(screen.getByText('Alderaan')).toBeInTheDocument();
    })

    const allPlanets = screen.getAllByTestId('planet-name');

    expect(allPlanets.length).toBe(10);

    userEvent.selectOptions(selectFilter, 'orbital_period');
    expect(selectFilter).toHaveValue('orbital_period');

    userEvent.selectOptions(compareFilter, 'menor que')
    expect(compareFilter).toHaveValue('menor que');

    userEvent.type(valueFilterInput, '400');
    expect(valueFilterInput).toHaveValue(400);

    userEvent.click(buttonFIlter);

    const filtredAllPlanets = screen.getAllByTestId('planet-name');
    expect(filtredAllPlanets.length).toBe(5);
  });

  it('Testing the filter number (igual a)', async () => {
    global.fetch=jest.fn(mockFetch);
    renderWithProvider(<App />);

    const selectFilter = screen.getByTestId('column-filter');
    const compareFilter = screen.getByTestId('comparison-filter');
    const valueFilterInput = screen.getByTestId('value-filter');
    const buttonFIlter = screen.getByTestId('button-filter');

    await waitFor(() => {
      expect(screen.getByText('Alderaan')).toBeInTheDocument();
    })

    const allPlanets = screen.getAllByTestId('planet-name');

    expect(allPlanets.length).toBe(10);

    userEvent.selectOptions(selectFilter, 'orbital_period');
    expect(selectFilter).toHaveValue('orbital_period');

    userEvent.selectOptions(compareFilter, 'igual a')
    expect(compareFilter).toHaveValue('igual a');

    userEvent.type(valueFilterInput, '304');
    expect(valueFilterInput).toHaveValue(304);

    userEvent.click(buttonFIlter);

    const filtredAllPlanets = screen.getAllByTestId('planet-name');
    expect(filtredAllPlanets.length).toBe(1);
  });
})


