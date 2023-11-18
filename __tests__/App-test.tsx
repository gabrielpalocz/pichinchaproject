/**
 * @format
 */

import 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../components/screens/homeScreen';
import RegisterScreen from '../components/screens/registerScreen';

describe('Home Screen tests', () => {
  const mockNavigation: any = {
    navigate: jest.fn(),
  };

  const mockRoute: any = {
    params: {},
  };

  it('renders screen correctly', () => {
    render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
  });

  test('renders search', () => {
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const searchInput = getByPlaceholderText('Search...');
    expect(searchInput).toBeTruthy();
  });

  it('handles search input correctly', () => {
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const searchInput = getByPlaceholderText('Search...');

    // Simulate user input in the search field
    fireEvent.changeText(searchInput, 'example search');

    // Input value has been updated
    expect(searchInput.props.value).toBe('example search');
  });

  test('renders EmptyList component when data is empty', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );

    // Check that the empty list message is present
    const emptyListMessage = getByText('No hay productos para mostrar.');
    expect(emptyListMessage).toBeDefined();
  });

  test('renders "Agregar" button', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const detailsButton = getByText('Agregar');
    expect(detailsButton).toBeDefined();
  });

  test('navigates to Register screen on "Agregar" button press', () => {
    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );

    // Find the "Add" button and simulate a click
    const addButton = getByText('Agregar');
    fireEvent.press(addButton);

    // Check if the navigation function was called with the 'Register' screen
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
  });
});

describe('Register Screen tests', () => {
  const mockNavigation: any = {
    navigate: jest.fn(),
  };

  const mockRoute: any = {
    params: {},
  };

  it('renders screen correctly', () => {
    render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
  });

  test('renders title', () => {
    const {getByText} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const titleForm = getByText('Formulario de Registro');
    expect(titleForm).toBeDefined();
  });

  test('renders "Enviar" button', () => {
    const {getByText} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const detailsButton = getByText('Enviar');
    expect(detailsButton).toBeDefined();
  });

  test('renders "Reiniciar" button', () => {
    const {getByText} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const detailsButton = getByText('Reiniciar');
    expect(detailsButton).toBeDefined();
  });

  test('renders ID input', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const idInput = getByTestId('ID-INPUT');
    expect(idInput).toBeDefined();
  });

  test('renders NAME input', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const nameInput = getByTestId('NAME-INPUT');
    expect(nameInput).toBeDefined();
  });

  test('renders Logo input', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const logoInput = getByTestId('LOGO-INPUT');
    expect(logoInput).toBeDefined();
  });

  test('renders Date_Release input', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const date_releaseInput = getByTestId('DREL-INPUT');
    expect(date_releaseInput).toBeDefined();
  });

  test('renders Date_Revision input', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <RegisterScreen navigation={mockNavigation} route={mockRoute} />
      </NavigationContainer>,
    );
    const date_revision = getByTestId('DREV-INPUT');
    expect(date_revision).toBeDefined();
  });
});
