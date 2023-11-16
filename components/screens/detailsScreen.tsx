/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {
  DetailsScreenProps,
  DetailsScreenRouteProp,
} from '../types/typesFile';

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

  function convertISOToFormattedDate(isoDate: Date): string {
    const dateObj = new Date(isoDate);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const data: Item[] = [
    {label: 'Nombre', value: name},
    {label: 'Descripción', value: description},
    {label: 'Logo', value: logo, isImage: true},
    {
      label: 'Fecha de liberación',
      value: convertISOToFormattedDate(date_release),
    },
    {
      label: 'Fecha de revisión',
      value: convertISOToFormattedDate(date_revision),
    },
  ];

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
        <TouchableOpacity style={styles.editButton} onPress={() => {}}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
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
