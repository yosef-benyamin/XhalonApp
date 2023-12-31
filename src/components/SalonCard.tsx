import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ic_barbershop, ic_stars} from 'assets/icons';
import {img_barber} from 'assets/images';
import {WINDOW_WIDTH, rowCenter} from 'utils/mixins';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {IStore} from 'types/products.types';
import Button from './Button';
import {BASE_URL} from '@env';
import {h1, h3, h5} from 'utils/styles';
import {theme} from 'utils';
import GetLocation from 'react-native-get-location';
import {getLocation} from 'utils/getDistance';

interface ICard {
  item: IStore;
  horizontal?: boolean;
}
const SalonCard = ({item, horizontal}: ICard) => {
  const navigation = useNavigation();
  const [getKm, setGetKm] = useState(0);

  useEffect(() => {
    getLocation();
    return () => {};
  }, []);
  return (
    <TouchableOpacity
      style={[rowCenter, styles.cardWrapper, horizontal ?{}:{width: WINDOW_WIDTH / 1.5}]}
      onPress={() => {
        navigation.navigate('SalonDetail', {dataStore: item});
      }}>
      <Image
        source={
          item?.THUMB_IMAGE
            ? {uri: BASE_URL + '/' + item?.THUMB_IMAGE}
            : ic_barbershop
        }
        style={{
          width: WINDOW_WIDTH / 2.5,
          height: 120,
          borderRadius: 10,
          alignSelf: 'center',
        }}
        resizeMode={'cover'}
      />

      <View style={styles.descWrapper}>
        <Text style={[h1, {fontSize: 13}]}>{item?.COMPANY_NAME}</Text>
        <Text style={[h5, {color: theme.colors.grey5, fontSize: 12}]}>
          {item?.OPERATIONAL_DAY}
        </Text>
        <Text style={[h5, {color: theme.colors.grey5, fontSize: 12}]}>
          {item?.OPERATIONAL_HOUR}
        </Text>
        {/* <Text>{item?.OPERATIONAL_HOUR}</Text> */}

        <View style={[rowCenter, {marginTop: 10}]}>
          <AirbnbRating
            count={5}
            defaultRating={parseInt(item?.RATING_STORE)}
            size={10}
            showRating={false}
            isDisabled
          />
        </View>

        <TouchableOpacity
          style={{
            width: '70%',
            padding: 5,
            backgroundColor: theme.colors.pink,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text style={[h5, {color: '#fff'}]}>Kunjungi</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SalonCard;

const styles = StyleSheet.create({
  descWrapper: {
    // margin: 16,
    elevation: 5,
    marginLeft: 10,
    width: WINDOW_WIDTH/2,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    // paddingHorizontal: 30,
    padding: 10,
    // paddingTop: 15,
    paddingBottom: 5,
    height: 120,
  },
  cardWrapper: {
    justifyContent: 'center',
    padding: 10,
    // width: WINDOW_WIDTH / 1.5,
    backgroundColor: '#fff',
    // elevation: 4,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
