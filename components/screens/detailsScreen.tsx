import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import type {
  DetailsScreenProps,
  DetailsScreenRouteProp,
} from '../types/typesFile';
import DeleteModal from '../ui-components/deleteModal';
import {authorId, baseUrl} from '../../constants';

type Item = {
  label: string;
  value: string;
  isImage?: boolean;
};

const InfoItem: React.FC<Item> = ({label, value, isImage = false}) => {
  return isImage ? (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Image style={styles.logo} source={{uri: value}} />
    </View>
  ) : (
    <View style={styles.nameContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

function DetailsScreen({navigation}: DetailsScreenProps) {
  const route = useRoute<DetailsScreenRouteProp>();
  const {id, name, description, logo, date_release, date_revision} =
    route.params;

  const [modalDeleteVisible, setModalDeleteVisible] = useState<boolean>(false);

  const openModalDelete = () => {
    setModalDeleteVisible(true);
  };

  const closeModalDelete = () => {
    setModalDeleteVisible(false);
  };

  const navigateToEdit = () => {
    navigation.navigate('Edit', {
      id,
      name,
      description,
      logo,
      date_release,
      date_revision,
    });
  };

  const data: Item[] = [
    {label: 'Nombre', value: name},
    {label: 'Descripción', value: description},
    {label: 'Logo', value: logo, isImage: true},
    {
      label: 'Fecha de liberación',
      value: moment(date_release).format('YYYY-MM-DD'),
    },
    {
      label: 'Fecha de revisión',
      value: moment(date_revision).format('YYYY-MM-DD'),
    },
  ];

  const handleDelete = async (value: string) => {
    try {
      const response = await fetch(`${baseUrl}/bp/products?id=${value}`, {
        method: 'DELETE',
        headers: {
          authorId,
        },
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
      <View style={styles.idContainer}>
        <Text style={styles.title}>ID: {id}</Text>
        <Text style={styles.subTitle}>Información extra</Text>
      </View>
      <View style={styles.infoContainer}>
        {data.map((item, index) => (
          <InfoItem
            key={index}
            label={item.label}
            value={item.value}
            isImage={item.isImage}
          />
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigateToEdit()}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={openModalDelete}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal
        visible={modalDeleteVisible}
        onClose={closeModalDelete}
        id={id}
        name={name}
        handleDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  idContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    color: 'black',
  },
  infoContainer: {
    flex: 1,
    marginTop: 40,
    padding: 10,
    gap: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    flex: 1,
    textAlign: 'right',
    color: 'black',
  },
  logo: {
    width: 180,
    height: 100,
    alignSelf: 'center',
  },
  buttonsContainer: {
    marginVertical: 30,
  },
  editButton: {
    backgroundColor: '#e9ecf3',
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 15,
  },
  editButtonText: {
    color: '#203668',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#d50707',
    borderRadius: 5,
    paddingVertical: 15,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
