import React, {useState} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import type {HomeScreenProps} from '../types/typesFile';
import {useFocusEffect} from '@react-navigation/native';
import {authorId, baseUrl} from '../../constants';

type ItemData = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

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

const EmptyList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyListText}>No hay productos para mostrar.</Text>
    </View>
  );
};

const SearchNoResults = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyListText}>
        No hay coincidecias para su busqueda.
      </Text>
    </View>
  );
};

function HomeScreen({navigation}: HomeScreenProps) {
  const [data, setData] = useState<ItemData[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const filteredData = data.filter((item: {name: string}) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // GET all data
  useFocusEffect(() => {
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
  });

  const handleSearch = (text: string) => {
    setSearchText(text);
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
      {data.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={({item}) => (
            <Item item={item} onPress={() => navigateToDetails(item)} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.containerFlatList}
          ItemSeparatorComponent={ItemSeparator}
          ListEmptyComponent={SearchNoResults}
        />
      ) : (
        <EmptyList />
      )}

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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    color: 'black',
  },
});

export default HomeScreen;
