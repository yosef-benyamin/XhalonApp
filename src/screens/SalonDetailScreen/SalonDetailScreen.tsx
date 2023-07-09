import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ic_arrow_left_black,
  ic_burgermenu,
  ic_cart,
  ic_chat,
  ic_crown,
  ic_glasses,
  ic_menu,
  ic_pinpoin,
  ic_star,
  ic_stars,
  ic_store_active,
} from 'assets/icons';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {img_barber} from 'assets/images';
import {h1, h2, h3, h5} from 'utils/styles';
import TopNavigation from './TopNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/navigator';
import { useProductStore } from 'store/actions/ProductStore';
import Loading from 'components/Loading';

type salonDetailScreenRouteProp = RouteProp<RootStackParamList, 'SalonDetail'>;

const SalonDetailScreen = () => {
  const route = useRoute<salonDetailScreenRouteProp>();
  const dataStore = route?.params.dataStore;
  const navigation = useNavigation();
  const ProductStore = useProductStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    ProductStore.getProduct({
      COMPANY_ID: dataStore?.COMPANY_ID,
    });
    setIsLoading(false)
    return () => {
      setIsLoading(false)
    }
  }, [navigation]);
  

  if(isLoading) return <Loading/>

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[rowCenter, styles.header]}>
        <TouchableOpacity style={styles.whiteBox} onPress={()=> navigation.goBack()}>
          <Image source={ic_arrow_left_black} style={[iconCustomSize(17)]} resizeMode='stretch' />
        </TouchableOpacity>

        <TouchableOpacity style={[rowCenter, styles.searchBox]} onPress={()=> navigation.navigate('Search')}>
          <Text style={[h5, {fontSize:12}]}>Pencarian Produk</Text>
          <Image source={ic_glasses} style={[iconCustomSize(14)]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.whiteBox} onPress={()=> navigation.navigate('CartList')}>
          <Image source={ic_cart} style={[iconSize, {tintColor: theme.colors.low_pink}]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.whiteBox}>
          <Image source={ic_chat} style={[iconSize, {tintColor: theme.colors.low_pink}]} />
        </TouchableOpacity>
      </View>



      <ScrollView>
        <View style={[rowCenter, {margin: 16}]}>
          <Image
            source={img_barber}
            style={{width: 113, height: 68, borderRadius: 10}}
          />

          <View style={[{marginLeft: 10}]}>
            <View style={rowCenter}>
              <Image
                source={ic_store_active}
                style={iconSize}
                resizeMode={'contain'}
              />
              <Text style={[h1,{ marginLeft: 5}]}> {dataStore?.COMPANY_NAME}</Text>
            </View>
            <View style={[rowCenter, {marginVertical: 7}]}>
              {/* <Text style={[h2, {color: 'green'}]}>• Online</Text> */}
              <Text style={[h5, {marginLeft: 0}]}>{dataStore?.KOTA_NAME}</Text>
            </View>

            <View style={rowCenter}>
              <View style={[rowCenter]}>
                <Image source={ic_star} style={[iconSize, {}]} />
                <Text style={[h2, {color: theme.colors.grey3}]}> {dataStore?.RATING_STORE}</Text>
              </View>

              <Text style={[h2, {color: theme.colors.grey3, marginLeft: 10}]}> {'rata rata ulasan'}</Text>
            </View>
          </View>
        </View>

        <View style={{margin: 16}}>
          <Text style={[h1]}>Alamat Salon</Text>
          <View style={[rowCenter, {marginVertical: 10}]}>
            <Image
              source={ic_pinpoin}
              style={[iconCustomSize(12)]}
              resizeMode={'contain'}
            />
            <Text style={[h3]}> {dataStore?.ADDRESS}</Text>
          </View>
          {/* <View style={[rowCenter]}>
            <Image
              source={ic_stars}
              style={{height: 20, width: 100}}
              resizeMode={'contain'}
            />
            <Text>({dataStore.RATING_STORE}) 65 Reviews...</Text>
          </View> */}
        </View>

        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.grey3,
          }}
        />

        <TouchableOpacity style={styles.chatBox}>
          <Text style={[h1, {color: theme.colors.pink}]}>Chat</Text>
        </TouchableOpacity>

        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.grey3,
          }}
        />

        <TopNavigation COMPANY_ID = {dataStore?.COMPANY_ID} />
      </ScrollView>
    </View>
  );
};

export default SalonDetailScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    // backgroundColor: theme.colors.pink,
    padding: 10,
    paddingBottom: 20,
    // borderBottomRightRadius: 40,
    // borderBottomLeftRadius: 40,
  },
  whiteBox: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  searchBox: {
    backgroundColor: theme.colors.grey7,
    width: '60%',
    height: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  chatBox: {
    alignItems: 'center',
    padding: 15,
    borderColor: theme.colors.pink,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 15,
  },
});
