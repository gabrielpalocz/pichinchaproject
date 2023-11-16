/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View} from 'react-native';
import type {RegisterScreenProps} from '../types/typesFile';

// Momentary register screen, for test purposes
function RegisterScreen({navigation}: RegisterScreenProps) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Register Screen</Text>
    </View>
  );
}

export default RegisterScreen;
