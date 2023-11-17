import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import type {EditScreenProps, EditScreenRouteProp} from '../types/typesFile';
import {useRoute} from '@react-navigation/native';
import EditForm from '../forms/editForm';
import {authorId, baseUrl} from '../../constants';
import moment from 'moment';

interface Values {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

function EditScreen({navigation}: EditScreenProps) {
  const route = useRoute<EditScreenRouteProp>();
  const {id, name, description, logo, date_release, date_revision} =
    route.params;

  const navigateBackToDetails = (values: Values) => {
    const dateRelease = moment(values.date_release).toDate();
    const dateRevision = moment(values.date_revision).toDate();

    navigation.navigate({
      name: 'Details',
      params: {
        id: values.id,
        name: values.name,
        description: values.description,
        logo: values.logo,
        date_release: dateRelease,
        date_revision: dateRevision,
      },
      merge: true,
    });
  };

  const handleOnSubmit = async (values: Values) => {
    try {
      const response = await fetch(`${baseUrl}/bp/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorId,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigateBackToDetails(values);
      } else {
        Alert.alert('Ha ocurrido un error', `${response.status}`);
      }
    } catch (error) {
      Alert.alert('Ha ocurrido un error', `${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formText}>Formulario de Editar</Text>
      <EditForm
        onSubmit={e => handleOnSubmit(e)}
        data={{
          id,
          name,
          description,
          logo,
          date_release,
          date_revision,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  formText: {
    fontSize: 28,
    color: 'black',
    marginTop: 15,
  },
});

export default EditScreen;
