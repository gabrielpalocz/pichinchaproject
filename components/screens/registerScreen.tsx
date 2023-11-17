/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {Fragment} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import type {RegisterScreenProps} from '../types/typesFile';

interface Values {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

const validationSchema = yup.object().shape({
  id: yup
    .string()
    .min(3, 'Muy Corto!')
    .max(10, 'Muy Largo!')
    .required('Este campo es requerido!')
    .test('isValidId', 'ID no válido!', async value => {
      try {
        const response = await fetch(
          `https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification?id=${value}`,
        );
        const data = await response.json();
        return response.ok && !data;
      } catch (error) {
        console.error('Error al validar el ID:', error);
        return false;
      }
    }),
  name: yup
    .string()
    .min(5, 'Muy Corto!')
    .max(100, 'Muy Largo!')
    .required('Este campo es requerido!'),
  description: yup
    .string()
    .min(10, 'Muy Corto!')
    .max(200, 'Muy Largo!')
    .required('Este campo es requerido!'),
  logo: yup.string().required('Este campo es requerido!'),
  date_release: yup.string().required('Este campo es requerido!'),
  date_revision: yup.string().required('Este campo es requerido!'),
});

function RegisterScreen({navigation}: RegisterScreenProps) {
  function convertToFormattedDate(isoDate: Date): string {
    const dateObj = new Date(isoDate);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  const authorId = '813498482';
  const handleOnSubmit = async (values: Values) => {
    try {
      const response = await fetch(
        'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorId,
          },
          body: JSON.stringify(values),
        },
      );

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
      <Text style={styles.formText}>Formulario de Registro</Text>

      <Formik
        initialValues={{
          id: '',
          name: '',
          description: '',
          logo: '',
          date_release: '',
          date_revision: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          values,
          errors,
          touched,
        }) => (
          <Fragment>
            <ScrollView>
              <View style={styles.contentView}>
                <Text style={styles.titleField}>ID</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('id')}
                  onBlur={handleBlur('id')}
                  value={values.id}
                />
                {touched.id && errors.id && (
                  <Text style={styles.onError}>{errors.id}</Text>
                )}
                <Text style={styles.titleField}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.onError}>{errors.name}</Text>
                )}
                <Text style={styles.titleField}>Descripción</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
                {touched.description && errors.description && (
                  <Text style={styles.onError}>{errors.description}</Text>
                )}
                <Text style={styles.titleField}>Logo</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('logo')}
                  onBlur={handleBlur('logo')}
                  value={values.logo}
                />
                {touched.logo && errors.logo && (
                  <Text style={styles.onError}>{errors.logo}</Text>
                )}
                <Text style={styles.titleField}>Fecha de Liberación</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={'gray'}
                  onChangeText={text => {
                    handleChange('date_release')(text);
                    const enteredDate = new Date(text);
                    if (!isNaN(enteredDate.getTime())) {
                      const oneYearLater = new Date(
                        enteredDate.getFullYear() + 1,
                        enteredDate.getMonth(),
                        enteredDate.getDate(),
                      );
                      handleChange('date_revision')(
                        convertToFormattedDate(oneYearLater),
                      );
                    }
                  }}
                  onBlur={handleBlur('date_release')}
                  value={values.date_release}
                />
                {touched.date_release && errors.date_release && (
                  <Text style={styles.onError}>{errors.date_release}</Text>
                )}
                <Text style={styles.titleField}>Fecha de Revisión</Text>
                <TextInput
                  style={[styles.input, styles.disabledTextInput]}
                  onChangeText={handleChange('date_revision')}
                  onBlur={handleBlur('date_revision')}
                  value={values.date_revision}
                  editable={false}
                />
                {touched.date_revision && errors.date_revision && (
                  <Text style={styles.onError}>{errors.date_revision}</Text>
                )}
              </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSubmit}>
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => resetForm()}>
                <Text style={styles.resetButtonText}>Reiniciar</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </Formik>
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
  input: {
    borderColor: '#d6d8db',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  contentView: {
    flex: 1,
    marginTop: 20,
  },
  titleField: {
    marginTop: 20,
    color: 'black',
  },
  onError: {
    color: 'red',
  },
  disabledTextInput: {
    opacity: 0.6,
    backgroundColor: '#f0f0f0',
  },
  buttonsContainer: {
    marginVertical: 30,
  },
  sendButton: {
    backgroundColor: '#ffdd00',
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 15,
  },
  sendButtonText: {
    color: '#203668',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#e9ecf3',
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 15,
  },
  resetButtonText: {
    color: '#203668',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
