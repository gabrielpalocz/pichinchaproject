import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import type {RegisterScreenProps} from '../types/typesFile';
import RegisterForm from '../forms/registerForm';
import {authorId, baseUrl} from '../../constants';

interface Values {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

function RegisterScreen({navigation}: RegisterScreenProps) {
  const handleOnSubmit = async (values: Values) => {
    try {
      const response = await fetch(`${baseUrl}/bp/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorId,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        Alert.alert('Ha ocurrido un error', `${response.status}`);
      }
    } catch (error) {
      Alert.alert('Ha ocurrido un error', `${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitleText}>Formulario de Registro</Text>
      <RegisterForm onSubmit={e => handleOnSubmit(e)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  formTitleText: {
    fontSize: 28,
    color: 'black',
    marginTop: 15,
  },
});

export default RegisterScreen;
