import React, {Fragment} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import {baseUrl} from '../../constants';

interface Values {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

interface FormProps {
  onSubmit: (values: Values) => void;
}

// Validation Schema to control what the user enters
const validationSchema = yup.object().shape({
  id: yup
    .string()
    .min(3, 'Muy Corto!')
    .max(10, 'Muy Largo!')
    .required('Este campo es requerido!')
    .test('isValidId', 'ID no válido!', async value => {
      try {
        const response = await fetch(
          `${baseUrl}/bp/products/verification?id=${value}`,
        );
        const data = await response.json();
        return response.ok && !data;
      } catch (error) {
        Alert.alert('Ha ocurrido un error', `${error}`);
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
  date_release: yup
    .string()
    .required('Este campo es requerido!')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'El formato debe ser YYYY-MM-DD')
    .test('fecha-valida', 'Ingrese una fecha válida', function (value) {
      return moment(value, 'YYYY-MM-DD', true).isValid();
    })
    .test(
      'fecha-futura',
      'La fecha debe ser igual o mayor a la fecha actual',
      function (value) {
        return moment(value, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day');
      },
    ),
});

// Form to register screen
const RegisterForm: React.FC<FormProps> = ({onSubmit}) => {
  return (
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
      onSubmit={(values, actions) => {
        let updatedValues = {...values};

        const dateRevision = moment(values.date_release)
          .add(1, 'years')
          .format('YYYY-MM-DD');
        actions.setFieldValue('date_revision', dateRevision);

        updatedValues = {
          ...updatedValues,
          date_revision: dateRevision,
        };
        onSubmit(updatedValues);
      }}>
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
                style={[
                  styles.input,
                  touched.id && errors.id
                    ? styles.onErrorBorder
                    : styles.onNormalBorder,
                ]}
                onChangeText={handleChange('id')}
                onBlur={handleBlur('id')}
                value={values.id}
                testID="ID-INPUT"
              />
              {touched.id && errors.id && (
                <Text style={styles.onError}>{errors.id}</Text>
              )}
              <Text style={styles.titleField}>Nombre</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.name && errors.name
                    ? styles.onErrorBorder
                    : styles.onNormalBorder,
                ]}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                testID="NAME-INPUT"
              />
              {touched.name && errors.name && (
                <Text style={styles.onError}>{errors.name}</Text>
              )}
              <Text style={styles.titleField}>Descripción</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.description && errors.description
                    ? styles.onErrorBorder
                    : styles.onNormalBorder,
                ]}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
                testID="DES-INPUT"
              />
              {touched.description && errors.description && (
                <Text style={styles.onError}>{errors.description}</Text>
              )}
              <Text style={styles.titleField}>Logo</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.logo && errors.logo
                    ? styles.onErrorBorder
                    : styles.onNormalBorder,
                ]}
                onChangeText={handleChange('logo')}
                onBlur={handleBlur('logo')}
                value={values.logo}
                testID="LOGO-INPUT"
              />
              {touched.logo && errors.logo && (
                <Text style={styles.onError}>{errors.logo}</Text>
              )}
              <Text style={styles.titleField}>Fecha de Liberación</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.date_release && errors.date_release
                    ? styles.onErrorBorder
                    : styles.onNormalBorder,
                ]}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={'gray'}
                onChangeText={handleChange('date_release')}
                onBlur={handleBlur('date_release')}
                value={values.date_release}
                testID="DREL-INPUT"
              />
              {touched.date_release && errors.date_release && (
                <Text style={styles.onError}>{errors.date_release}</Text>
              )}
              <Text style={styles.titleField}>Fecha de Revisión</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.disabledTextInput,
                  styles.onNormalBorder,
                ]}
                onChangeText={handleChange('date_revision')}
                onBlur={handleBlur('date_revision')}
                value={values.date_revision}
                editable={false}
                testID="DREV-INPUT"
              />
              {touched.date_revision && errors.date_revision && (
                <Text style={styles.onError}>{errors.date_revision}</Text>
              )}
            </View>
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
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
  );
};

const styles = StyleSheet.create({
  input: {
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
  onErrorBorder: {
    borderColor: 'red',
  },
  onNormalBorder: {
    borderColor: '#d6d8db',
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

export default RegisterForm;
