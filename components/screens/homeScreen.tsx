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
  date_release: Date | null;
  date_revision: Date | null;
};

const dateRelease = new Date('2023-02-01');
const dateRevision = new Date('2024-02-01');

// Momentary data, test purpose.
const dataTest = [
  {
    id: '123455',
    name: 'one',
    description: '',
    logo: '',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123456',
    name: 'two',
    description: '',
    logo: '',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123457',
    name: 'three',
    description: '',
    logo: '',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123458',
    name: 'four',
    description: '',
    logo: '',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123459',
    name: 'five',
    description: '',
    logo: '',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123460',
    name: 'six',
    description: '',
    logo: '',
    date_release: dateRelease,
    date_revision: dateRevision,
  },
  {
    id: '123461',
    name: 'seven',
    description: '',
    logo: '',
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
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subTitle}>ID: {item.id}</Text>
      </View>
      <View>
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

  // const authorId = '813498482';

  // const baseUrl =
  //   'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

  // // GET all data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${baseUrl}/bp/products`, {
  //         method: 'GET',
  //         headers: {
  //           authorId,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`${response.status}`);
  //       }

  //       const responseData = await response.json();
  //       setData(responseData);
  //     } catch (error) {
  //       Alert.alert('Ha ocurrido un error', `${error}`);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredData = dataTest.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filteredData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={'black'}
        onChangeText={handleSearch}
        value={searchText}
      />
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} onPress={() => {}} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerFlatList}
        ItemSeparatorComponent={ItemSeparator}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  title: {
    fontSize: 16,
    color: 'black',
  },
  subTitle: {
    fontSize: 12,
    color: 'black',
  },
  rightArrow: {
    marginRight: 15,
    color: 'black',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#d6d8db',
  },
});

export default HomeScreen;
