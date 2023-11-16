import type {RouteProp} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date | null;
    date_revision: Date | null;
  };
};
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
