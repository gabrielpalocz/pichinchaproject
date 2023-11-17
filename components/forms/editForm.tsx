import React, {Fragment} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

type ItemData = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
};

interface Values {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

interface FormProps {
  data: ItemData;
  onSubmit: (values: Values) => void;
}

const validationSchema = yup.object().shape({
  id: yup
    .string()
    .min(3, 'Muy Corto!')
    .max(10, 'Muy Largo!')
    .required('Este campo es requerido!'),
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

const EditForm: React.FC<FormProps> = ({onSubmit, data}) => {
  const {id, name, description, logo, date_release, date_revision} = data;
  function convertToFormattedDate(isoDate: Date): string {
    const dateObj = new Date(isoDate);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <Formik
      initialValues={{
        id,
        name,
        description,
        logo,
        date_release: convertToFormattedDate(date_release),
        date_revision: convertToFormattedDate(date_revision),
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
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
                style={[styles.input, styles.disabledTextInput]}
                onChangeText={handleChange('id')}
                onBlur={handleBlur('id')}
                value={values.id}
                editable={false}
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
            <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() =>
                resetForm({
                  values: {
                    id,
                    name: '',
                    description: '',
                    logo: '',
                    date_release: '',
                    date_revision: '',
                  },
                })
              }>
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

export default EditForm;
