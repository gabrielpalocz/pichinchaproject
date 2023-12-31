import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/screens/homeScreen';
import DetailsScreen from './components/screens/detailsScreen';
import RegisterScreen from './components/screens/registerScreen';
import EditScreen from './components/screens/editScreen';
import type {RootStackParamList} from './components/types/typesFile';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Roots
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'BANCO PICHINCHA',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#203668',
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'BANCO PICHINCHA',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#203668',
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'BANCO PICHINCHA',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#203668',
            },
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            title: 'BANCO PICHINCHA',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#203668',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
