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
import {ic_arrow_left, ic_arrow_right, ic_broken_image, ic_cart, ic_chat, ic_haircut, ic_menu, ic_search} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import {ic_beard, img_barber, img_boy, img_dash} from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import MainHeader from 'components/MainHeader/MainHeader';
import {useNavigation} from '@react-navigation/native';
import {useProductStore} from 'store/actions/ProductStore';
import {
  getBanners,
  kategoriFavorit,
  storePromo,
} from 'store/effects/productStore';
import {Banners, IStore} from 'types/products.types';
import {BASE_URL} from '@env';
import HeaderCarousel from './HeaderCarousel';
import SalonCard from 'components/SalonCard';
import {getLocation, calculateDistance} from 'utils/getDistance';

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
    func();
  }, [navigation]);

  const getKategoriFavorit = async () => {
    let resFav = await kategoriFavorit();
    resFav = resFav;
    setproductFav(resFav?.rs?.DATA);
    console.log('res = ', resFav);
  };

  const getStorePromo = async () => {
    let resFav = await storePromo();
    resFav = resFav;
    setStoreP(resFav?.rs?.DATA);
    console.log('res = ', resFav);
  };

  const [loc, setLoc] = useState();
  const func = async () => {
    let a: any = await getLocation();
    console.log('aaa =', a);
    setLoc(a);
  };

  const _getDistance = (item: IStore) => {
    const lat1 = parseInt(item?.MAP_LOCATION?.split(',')?.[0]); // Latitude titik awal
    const lon1 = parseInt(item?.MAP_LOCATION?.split(',')?.[1]); // Longitude titik awal
    const lat2 = loc?.latitude; // Ganti dengan nilai yang sesuai
    const lon2 = loc?.longitude; // Ganti dengan nilai yang sesuai

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    return distance.toFixed();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView nestedScrollEnabled>
        <HeaderCarousel />

        <View style={[rowCenter, {margin: 16}]}>
          {ProductStore?.groupCategory?.length > 0 &&
            [...ProductStore?.groupCategory].map((x, i) => (
              <TouchableOpacity key={i} style={styles.typeWrapper}>
                <Image source={x?.THUMB_IMAGE ? {uri: x?.THUMB_IMAGE}: ic_broken_image} style={iconSize} />
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
            <Image source={ic_arrow_left} style={[iconCustomSize(25), {position: 'absolute', left: 0, }]} />
            <Image source={ic_arrow_right} style={[iconCustomSize(25), {position: 'absolute', right: 0, }]} />
        </View>

        <View style={{margin: 16}}>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginBottom: 10},
            ]}>
            <Text style={[h5, {fontSize: 18}]}>Layanan Teratas Lainnya</Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {productFav?.length > 0 &&
                [...productFav].map((x, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{alignItems: 'center', width: 110}}
                    onPress={() => {
                      console.log('x?.ANALISA_ID_GLOBAL = ', x);
                      navigation.navigate('MainTab', {
                        screen: 'Product',
                        params: {
                          ANALISA_ID_GLOBAL: x?.ANALISA_ID_GLOBAL,
                        },
                      });
                    }}>
                    <Image
                      // source={ic_beard}
                      source={x?.THUMB_IMAGE ? {uri: x?.THUMB_IMAGE!}: ic_broken_image}
                      style={{
                        width: 70,
                        height: 53,
                        resizeMode: 'stretch'
                        // marginRight: 10,
                      }}
                    />
                    <Text style={[h5, {textAlign: 'center', width: '70%', fontSize: 14}]}>
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
            <Text style={[h5, {fontSize: 18}]}>Salon Populer Terdekat</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 10}]} onPress={()=> navigation.navigate('Search')}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {storeP?.length > 0 &&
                [...storeP].map((x: any, i) => (
                  <SalonCard
                    item={ProductStore.store.find(
                      y => y.COMPANY_ID === x?.COMPANY_ID,
                    )}
                    distance={_getDistance(
                      ProductStore.store.find(
                        y => y.COMPANY_ID === x?.COMPANY_ID,
                      ),
                    )}
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
            <Text style={[h5, {fontSize: 18}]}>Salon Promo</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 10}]} onPress={()=> navigation.navigate('Search')}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {storeP?.length > 0 &&
                [...storeP].map((x: any, i) => (
                  <SalonCard
                    item={ProductStore.store.find(
                      y => y.COMPANY_ID === x?.COMPANY_ID,
                    )}
                    distance={_getDistance(
                      ProductStore.store.find(
                        y => y.COMPANY_ID === x?.COMPANY_ID,
                      ),
                    )}
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
            <Text style={[h5, {fontSize: 18}]}>salon Terakhir di kunjungi</Text>
            <Text style={[h4, {color: theme.colors.pink, fontSize: 12}]} onPress={()=> navigation.navigate('Search')}>
              Lihat Semua
            </Text>
          </View>

          <View style={rowCenter}>
            <ScrollView horizontal>
              {storeP?.length > 0 &&
                [...storeP].map((x: any, i) => (
                  <SalonCard
                    item={ProductStore.store.find(
                      y => y.COMPANY_ID === x?.COMPANY_ID,
                    )}
                    distance={_getDistance(
                      ProductStore.store.find(
                        y => y.COMPANY_ID === x?.COMPANY_ID,
                      ),
                    )}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
        <Text style={{fontSize: 20, fontWeight: '600', color: theme.colors.pink, alignSelf: 'center'}}>© 2023  Xhalon | All Rights Reserved</Text>
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
