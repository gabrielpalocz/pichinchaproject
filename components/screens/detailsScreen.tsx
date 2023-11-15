/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View} from 'react-native';
import type {DetailsScreenProps} from '../types/typesFile';

// Momentary details screen, test purpose.
function DetailsScreen({navigation}: DetailsScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Details Screen</Text>
    </View>
  );
}

export default DetailsScreen;
