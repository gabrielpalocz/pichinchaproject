/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import type {HomeScreenProps} from '../types/typesFile';

type ItemData = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
};

const dateRelease = new Date('2023-02-01').toISOString();
const dateRevision = new Date('2024-02-01').toISOString();

// Momentary data, test purpose.
const dataTest = [
  {
    id: '123455',
    name: 'one',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123456',
    name: 'two',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123457',
    name: 'three',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123458',
    name: 'four',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123459',
    name: 'five',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123460',
    name: 'six',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123461',
    name: 'seven',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
};

const Item = ({item, onPress}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View style={styles.itemViewContainer}>
      <View style={styles.itemTextsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>ID: {item.id}</Text>
      </View>
      <View style={styles.rightArrowContainer}>
        <Text style={styles.rightArrow}>&gt;</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

function HomeScreen({navigation}: HomeScreenProps) {
  const [data, setData] = useState<any>(dataTest);
  const [searchText, setSearchText] = useState<string>('');

  const authorId = '813498482';

  const baseUrl =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

  // GET all data
  // =========USAR CON focusEffect====================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/bp/products`, {
          method: 'GET',
          headers: {
            authorId,
          },
        });

        if (!response.ok) {
          throw new Error(`${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        Alert.alert('Ha ocurrido un error', `${error}`);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredData = dataTest.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filteredData);
  };

  const navigateToDetails = (item: ItemData) => {
    navigation.navigate('Details', {
      id: item.id,
      name: item.name,
      description: item.description,
      logo: item.logo,
      date_release: item.date_release,
      date_revision: item.date_revision,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={'black'}
        onChangeText={handleSearch}
        value={searchText}
        inputMode="search"
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item item={item} onPress={() => navigateToDetails(item)} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerFlatList}
        ItemSeparatorComponent={ItemSeparator}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  input: {
    borderColor: '#d6d8db',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  containerFlatList: {
    borderWidth: 1,
    borderColor: '#d6d8db',
    borderRadius: 10,
    overflow: 'hidden',
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
  },
  itemViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextsContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  subTitle: {
    flex: 1,
    fontSize: 12,
    color: 'black',
  },
  rightArrowContainer: {
    marginHorizontal: 15,
  },
  rightArrow: {
    color: 'black',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#d6d8db',
  },
  addButton: {
    backgroundColor: '#ffdd00',
    borderRadius: 5,
    marginVertical: 30,
    paddingVertical: 15,
  },
  addButtonText: {
    color: '#203668',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
