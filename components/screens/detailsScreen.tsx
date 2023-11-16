/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {
  DetailsScreenProps,
  DetailsScreenRouteProp,
} from '../types/typesFile';

// Momentary details screen, test purpose.
function DetailsScreen({navigation}: DetailsScreenProps) {
  const route = useRoute<DetailsScreenRouteProp>();

  console.log(route);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Details Screen</Text>
    </View>
  );
}

export default DetailsScreen;
