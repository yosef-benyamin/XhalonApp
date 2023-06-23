import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {ic_cart, ic_chat, ic_haircut, ic_menu, ic_search} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import {ic_beard, img_barber, img_boy, img_dash} from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import MainHeader from 'components/MainHeader/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {useProductStore} from 'store/actions/ProductStore';
import { getBanners, kategoriFavorit, storePromo } from 'store/effects/productStore';
import { Banners } from 'types/products.types';
import { BASE_URL } from '@env';
import HeaderCarousel from './HeaderCarousel';

const HomeScreen = () => {
  const navigation = useNavigation();

  const ProductStore = useProductStore(state => state);
  const [productFav, setproductFav] = useState([]);
  const [storeP, setStoreP] = useState([]);
  

  // console.log('ProductStore = ', ProductStore.store)

  useEffect(() => {
    ProductStore.getStore();
    ProductStore.getGroupCategory();
    ProductStore.getProduct();
    ProductStore.getCategory();
    getKategoriFavorit();
    getStorePromo();
  }, [navigation]);

  const getKategoriFavorit=async()=> {
    let resFav = await kategoriFavorit();
    resFav = resFav;
    setproductFav(resFav?.rs?.DATA)
    console.log('res = ', resFav);
  }

  const getStorePromo=async()=> {
    let resFav = await storePromo();
    resFav = resFav;
    setStoreP(resFav?.rs?.DATA)
    console.log('res = ', resFav);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView nestedScrollEnabled>
        <HeaderCarousel/>

        <View style={[rowCenter, {margin: 16}]}>
          {ProductStore?.groupCategory?.length > 0 &&
            [...ProductStore?.groupCategory].map((x, i) => (
              <TouchableOpacity key={i} style={styles.typeWrapper}>
                <Image source={{uri: x?.THUMB_IMAGE}} style={iconSize} />
                <Text
                  style={[
                    h2,
                    {
                      color: theme.colors.pink,
                      fontSize: 10,
                      marginTop: 5,
                      textAlign: 'center',
                    },
                  ]}>
                  {x?.GROUP_ANALISA_NAME}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={{margin: 16}}>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={[h1, {fontSize: 15}]}>Layanan Teratas Lainnya</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 12}]}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {productFav?.length > 0 &&
                [...productFav].map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{alignItems: 'center', width: 110}}
                    onPress={() => {
                      console.log('x?.ANALISA_ID_GLOBAL = ', x)
                      navigation.navigate('MainTab', {
                        screen: 'Product',
                        params: {
                          ANALISA_ID_GLOBAL: x?.ANALISA_ID_GLOBAL,
                        },
                      });
                    }}>
                    <Image
                      source={ic_beard}
                      // source={{uri: x?.THUMB_IMAGE!}}
                      style={{
                        width: 70,
                        height: 53,
                        // marginRight: 10,
                      }}
                    />
                    <Text style={[h4, {textAlign: 'center', width: '70%'}]}>
                      {x?.KET_ANALISA_GLOBAL}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>

        <View style={{margin: 16}}>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={[h1, {fontSize: 15}]}>salon populer terdekat</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 12}]}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {storeP?.length > 0 &&
                [...storeP].map((x, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SalonDetail', {
                        dataStore: x,
                      })
                    }>
                    <Image
                      source={img_barber}
                      style={{
                        width: WINDOW_WIDTH / 1.5,
                        height: 150,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>

        <View style={{margin: 16}}>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={[h1, {fontSize: 15}]}>salon Promo</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 12}]}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {storeP?.length > 0 && [...storeP].map((x, i) => (
                <Image
                  source={img_barber}
                  style={{
                    width: WINDOW_WIDTH / 1.5,
                    height: 150,
                    marginRight: 10,
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{margin: 16}}>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={[h1, {fontSize: 15}]}>salon Terakhir di kunjungi</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 12}]}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {[...Array(6).fill(0)].map((x, i) => (
                <Image
                  source={img_barber}
                  style={{
                    width: WINDOW_WIDTH / 1.5,
                    height: 150,
                    marginRight: 10,
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-between',
  },
  headerWrapper: {
    backgroundColor: theme.colors.pink,
    padding: 16,
    paddingBottom: 50,
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
  },
  
  
  typeWrapper: {
    borderRadius: 50,
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
