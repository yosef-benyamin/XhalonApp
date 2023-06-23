import {
  Alert,
  Image,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ic_arrow_left_black,
  ic_burgermenu,
  ic_cart,
  ic_crown,
  ic_glasses,
  ic_heart,
  ic_heart_line,
  ic_love,
  ic_pinpoin,
  ic_star,
  ic_stars,
} from 'assets/icons';
import {WINDOW_WIDTH, iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {img_barber, img_hair} from 'assets/images';
import {h1, h2, h4} from 'utils/styles';
import TopNavigation from './TopNavigation';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RootStackParamList} from 'types/navigator';
import {useProductStore} from 'store/actions/ProductStore';
import Loading from 'components/Loading';
import {currencyFormat} from 'utils/currencyFormat';
import ProductCard from 'components/ProductCard';
import { useFavoriteStore } from 'store/actions/favoritStore';
import { addFavorit, deleteFavorit } from 'store/effects/favoritStore';
import Button from 'components/Button';
import { checkCart } from 'utils/addToCart';

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const dataStore = route?.params.dataProduct;
  const navigation = useNavigation();
  const ProductStore = useProductStore(state => state);
  const [isLoading, setIsLoading] = useState(false);
  const refSv = useRef<ScrollView>();

  const favoriteStore = useFavoriteStore(state => state);


  const getFav=async()=> {
    // setLoader(true)
    favoriteStore.getFavorite();
    // setLoader(false)
  }

  const handleDeleteFav = async (id: any) => {
    let _ = [];
    _.push({
      PART_ID: id,
    });
    
    let res = await deleteFavorit(_);
    getFav();
  };

  const handleAddFav = async (id: any) => {
    let _ = [];
    _.push({
      PART_ID: id,
    });
    
    let res = await addFavorit(_);
    getFav();
  };


  useEffect(() => {
    setIsLoading(true);
    ProductStore.getProduct({
      COMPANY_ID: dataStore?.COMPANY_ID,
    });
    setIsLoading(false);
    return () => {
      setIsLoading(false);
    };
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      refSv.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, []),
  );

  if (isLoading) return <Loading />;

  return (
    <View style={{flex: 1}}>
      <View style={[rowCenter, styles.header]}>
        <TouchableOpacity style={styles.whiteBox}>
          <Image source={ic_arrow_left_black} style={[iconSize]} />
        </TouchableOpacity>

        <View style={[rowCenter, styles.searchBox]}>
          <TextInput
            placeholder="Pencarian Produk"
            style={{width: '50%', fontSize: 12, padding: 2}}
          />
          <Image source={ic_glasses} style={iconSize} />
        </View>
        <TouchableOpacity
          style={styles.whiteBox}
          onPress={() => navigation.navigate('CartList')}>
          <Image source={ic_cart} style={iconSize} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.whiteBox}>
          <Image source={ic_burgermenu} style={iconSize} />
        </TouchableOpacity>
      </View>

      <ScrollView ref={refSv}>
        <View style={{marginHorizontal: 16}}>
          <Image
            source={img_hair}
            style={{
              height: 370,
              width: 370,
              borderRadius: 10,
              alignSelf: 'center',
            }}
          />

          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <View style={[rowCenter]}>
              <Text>
                20%{' '}
                <Text style={{textDecorationLine: 'line-through'}}>
                  {currencyFormat(25000)}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log(
                  'part id = ',
                  favoriteStore?.listFavorite?.find(
                    x => x?.NO_TRX === dataStore?.PART_ID,
                  ),
                );
                if (
                  favoriteStore?.listFavorite?.find(
                    x => x?.PART_ID === dataStore?.PART_ID,
                  )?.PART_ID
                ) {
                  handleDeleteFav(dataStore.PART_ID);
                } else {
                  handleAddFav(dataStore.PART_ID);
                }
              }}>
              <Image source={favoriteStore?.listFavorite?.find(x=> x?.PART_ID === dataStore?.PART_ID)?.PART_ID ? ic_heart : ic_heart_line} style={iconCustomSize(24)} />
            </TouchableOpacity>
          </View>

          <Text style={[h1, {fontSize: 21}]}>
            {currencyFormat(dataStore?.UNIT_PRICE)}
          </Text>
          <Text style={[h1, {fontSize: 18, marginVertical: 10}]}>
            {dataStore?.PART_NAME}
          </Text>

          <ScrollView horizontal>
            <View style={[rowCenter, {justifyContent: 'space-between'}]}>
              <Text style={[h4, {fontSize: 15}]}>Terjual 1000</Text>

              <TouchableOpacity
                style={[
                  rowCenter,
                  {
                    padding: 5,
                    borderColor: '#616161',
                    borderWidth: 1,
                    marginLeft: 10,
                  },
                ]}>
                <Image source={ic_stars} style={iconCustomSize(15)} />
                <Text>4,9(9 Rb)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  rowCenter,
                  {
                    padding: 5,
                    borderColor: '#616161',
                    borderWidth: 1,
                    marginHorizontal: 10,
                  },
                ]}>
                <Text>Foto Pembeli</Text>
                <Text style={{color: '#616161'}}>(1000)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  rowCenter,
                  {padding: 5, borderColor: '#616161', borderWidth: 1},
                ]}>
                <Text>Diskusi</Text>
                <Text style={{color: '#616161'}}>(1000)</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Text style={[h1]}>Terlaris #1</Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginVertical: 10,
            }}
          />

          <Text style={[h1, {fontSize: 16}]}>Deskripsi Produk</Text>
          <Text style={[h1, {fontSize: 13, marginTop: 10, height: 100}]}>
            Catok adalah ....
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginVertical: 10,
            }}
          />

          <View style={[rowCenter, {margin: 16}]}>
            <Image
              source={img_barber}
              style={{width: 113, height: 68, borderRadius: 10}}
            />

            <View style={[{marginLeft: 10}]}>
              <View style={rowCenter}>
                <Image
                  source={ic_crown}
                  style={iconSize}
                  resizeMode={'contain'}
                />
                <Text style={[h1]}> {dataStore?.COMPANY_NAME}</Text>
              </View>
              <View style={[rowCenter, {marginVertical: 7}]}>
                {/* <Text style={[h2, {color: 'green'}]}>• Online</Text> */}
                <Text style={{marginLeft: 20}}>{dataStore?.KOTA_NAME}</Text>
              </View>
            </View>
          </View>

          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <View style={rowCenter}>
              <View style={[rowCenter]}>
                <Image source={ic_star} style={iconSize} />
                <Text style={[h2, {color: '#000'}]}> 5.0</Text>
              </View>

              <Text style={{marginLeft: 20}}>Rata Rata Ulasan</Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 15,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: theme.colors.pink,
              }}
              onPress={() => {
                let _salon = ProductStore?.store?.find(
                  x => x.COMPANY_ID === dataStore?.COMPANY_ID,
                );
                console.log(dataStore?.COMPANY_ID, ProductStore?.store);
                if (!_salon) {
                  Alert.alert('PERINGATAN', 'Salon tidak ditemukan');
                  return;
                }
                navigation.navigate('SalonDetail', {
                  dataStore: _salon,
                });
              }}>
              <Text style={[h1, {color: theme.colors.pink}]}>Kunjungi</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginVertical: 10,
            }}
          />

          <Text style={[h1, {fontSize: 21, marginBottom: 10}]}>
            Lainnya Dari Salon Ini
          </Text>

          <ScrollView horizontal>
            {ProductStore?.product
              ?.filter(x => x.COMPANY_ID === dataStore?.COMPANY_ID)
              ?.map((x, i) => (
                <TouchableOpacity
                  style={{
                    width: WINDOW_WIDTH / 2,
                    marginRight: 10,
                  }}
                  >
                  <ProductCard key={i} item={x} func={()=>{
                    refSv.current?.scrollTo({
                      y: 0,
                      animated: true,
                    });
                  }} />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View style={{marginBottom: 20}}/>
      </ScrollView>

      <View style={[rowCenter, {justifyContent: 'space-between', marginHorizontal: 10, marginBottom: 10}]}>
        <Button _theme='pink' onPress={()=> {}} title='CHAT' styleWrapper={{width: '30%'}} />
        <Button _theme='pink' onPress={()=> checkCart(dataStore)} title='Masukkan Keranjang' styleWrapper={{width: '67%'}} />
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    backgroundColor: theme.colors.pink,
    padding: 10,
    paddingBottom: 60,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
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
    backgroundColor: '#fff',
    width: '60%',
    height: 40,
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 5,
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
