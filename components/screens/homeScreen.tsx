import React, {useState, useEffect} from 'react';
import {Text, View, Button, Alert} from 'react-native';
import type {HomeScreenProps} from '../types/typesFile';

// Momentary home screen, test purpose.
function HomeScreen({navigation}: HomeScreenProps) {
  const [data, setData] = useState<any>(null);

  const authorId = '813498482';

  const baseUrl =
    'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

  // GET all data
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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{color: 'black'}}>Home Screen</Text>
      <Text style={{color: 'black'}}>
        {data ? JSON.stringify(data) : 'Cargando...'}
      </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default HomeScreen;
