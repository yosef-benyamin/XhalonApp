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
  ic_chat,
  ic_crown,
  ic_glasses,
  ic_heart,
  ic_broken_image,
  ic_heart_line,
  ic_love,
  ic_pinpoin,
  ic_star,
  ic_stars,
  ic_store_active,
} from 'assets/icons';
import {WINDOW_WIDTH, iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {ic_beard, img_barber, img_boy, img_hair} from 'assets/images';
import {h1, h2, h3, h4, h5} from 'utils/styles';
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
import {useFavoriteStore} from 'store/actions/favoritStore';
import {addFavorit, deleteFavorit} from 'store/effects/favoritStore';
import Button from 'components/Button';
import {checkCart} from 'utils/addToCart';
import {BASE_URL} from '@env';
import { AirbnbRating } from 'react-native-ratings';

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

  const getFav = async () => {
    // setLoader(true)
    favoriteStore.getFavorite();
    // setLoader(false)
  };

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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[rowCenter, styles.header]}>
        <TouchableOpacity
          style={styles.whiteBox}
          onPress={() => navigation.goBack()}>
          <Image
            source={ic_arrow_left_black}
            style={[iconCustomSize(17)]}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[rowCenter, styles.searchBox]}
          onPress={() => navigation.navigate('Search')}>
          <Text style={[h5, {fontSize: 12}]}>Pencarian Produk</Text>
          <Image source={ic_glasses} style={[iconCustomSize(14)]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.whiteBox}
          onPress={() => navigation.navigate('CartList')}>
          <Image source={ic_cart} style={[iconSize, {}]} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.whiteBox}>
          <Image source={ic_chat} style={[iconSize, {}]} />
        </TouchableOpacity>
      </View>

      <ScrollView ref={refSv}>
        <View style={{marginHorizontal: 16}}>
          <Image
            source={
              dataStore?.MAIN_IMAGE
                ? {uri: BASE_URL + '/' + dataStore?.MAIN_IMAGE}
                : ic_broken_image
            }
            style={{
              height: 370,
              width: WINDOW_WIDTH - 20,
              borderRadius: 10,
              alignSelf: 'center',
              resizeMode: 'cover',
            }}
          />

          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginTop: 10},
            ]}>
            <View>
              {dataStore?.DISCOUNT_VAL !== 0 ? (
                <View style={[rowCenter]}>
                  <Text style={[h4, {}]}>
                    {dataStore?.DISCOUNT_VAL}%{' '}
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        fontWeight: '300',
                      }}>
                      {currencyFormat(dataStore?.UNIT_PRICE)}
                    </Text>
                  </Text>
                </View>
              ) : (
                <View />
              )}
              <Text style={[h1, {fontSize: 21}]}>
                {currencyFormat(dataStore?.UNIT_PRICE)}
              </Text>
              <Text
                style={[
                  h1,
                  {fontSize: 17, marginVertical: 5, color: theme.colors.grey2},
                ]}>
                {dataStore?.PART_NAME}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-start',
                marginTop: 10,
              }}
              onPress={() => {
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
              <Image
                source={
                  favoriteStore?.listFavorite?.find(
                    x => x?.PART_ID === dataStore?.PART_ID,
                  )?.PART_ID
                    ? ic_heart
                    : ic_heart_line
                }
                style={iconCustomSize(24)}
              />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal>
            <View style={[rowCenter, {justifyContent: 'space-between'}]}>
              <Text style={[h3, {fontSize: 16, fontWeight: '300'}]}>
                Terjual 1000
              </Text>

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

          <View style={styles.lineHorizontal} />

          <Text style={[h1, {fontSize: 21}]}>Deskripsi Produk</Text>
          <Text
            style={[
              h4,
              {
                fontSize: 16,
                marginTop: 10,
                height: 100,
                fontWeight: '500',
                color: '#000',
                lineHeight: 24,
              },
            ]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            excepturi sed provident magni odit accusamus beatae eveniet velit
            veniam non quidem aut incidunt quae error. Quam nesciunt nisi id
            accusantium!
          </Text>

          <View style={styles.lineHorizontal} />

          <View style={[rowCenter, {margin: 16}]}>
            <Image
              source={
                ProductStore?.store?.find(
                  x => x.COMPANY_ID === dataStore?.COMPANY_ID,
                )?.THUMB_IMAGE
                  ? {
                      uri:
                        BASE_URL +
                        '/' +
                        ProductStore?.store?.find(
                          x => x.COMPANY_ID === dataStore?.COMPANY_ID,
                        )?.THUMB_IMAGE,
                    }
                  : ic_broken_image
              }
              style={{height: 68, width: 113, borderRadius: 10}}
              resizeMode={'contain'}
            />

            <View style={[{marginLeft: 10}]}>
              <View style={rowCenter}>
                <Image
                  source={ic_crown}
                  style={iconCustomSize(14)}
                  resizeMode={'contain'}
                />
                <Text style={[h1, {}]}> {dataStore?.COMPANY_NAME}</Text>
              </View>
              <Text style={[h5, {color: theme.colors.grey4, marginTop: 5}]}>
                {
                  ProductStore?.store?.find(
                    x => x.COMPANY_ID === dataStore?.COMPANY_ID,
                  )?.KOTA_NAME
                }
              </Text>
            </View>
          </View>

          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <View style={rowCenter}>
              <View style={[rowCenter]}>
                <Image source={ic_star} style={iconCustomSize(13)} />
                <Text style={[h2, {color: '#000'}]}>
                  {' '}
                  {
                    ProductStore?.store?.find(
                      x => x.COMPANY_ID === dataStore?.COMPANY_ID,
                    )?.RATING_STORE
                  }
                </Text>
              </View>

              <Text style={[h5, {marginLeft: 10}]}>Rata Rata Ulasan</Text>
            </View>

            <TouchableOpacity
              style={{
                padding: 15,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: theme.colors.pink,
                borderRadius: 5,
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

          <View style={styles.lineHorizontal} />

          <Text style={[h1, {fontSize: 17, marginBottom: 10, marginTop: 20}]}>
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
                  }}>
                  <ProductCard
                    key={i}
                    item={x}
                    func={() => {
                      refSv.current?.scrollTo({
                        y: 0,
                        animated: true,
                      });
                    }}
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        <View style={[styles.lineHorizontal]} />

        <View style={[{padding: 16}]}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 16}]}>Ulasan Pembeli</Text>
            <Text style={[h5, {color: theme.colors.pink}]}>Lihat Semua</Text>
          </View>

          <View style={[rowCenter]}>
            <Image
              source={ic_star}
              style={[iconSize, {tintColor: '#c8ad42'}]}
            />
            <Text style={[h1]}>4.7</Text>
            <Text style={[h1, {marginLeft: 5, color: theme.colors.grey4}]}>
              dari 67234 Rating . 198 Ulasan
            </Text>
          </View>

          <View style={[rowCenter]}>
            {[...Array(5)]?.map((x, i) => (
              <Image source={ic_beard} style={[iconCustomSize(50), {marginRight : 10}]} />
            ))}
          </View>

          <View style={[rowCenter, {marginTop: 20}]}>
            <Image source={img_boy} style={[iconCustomSize(30), {borderRadius: WINDOW_WIDTH/2}]} />
            <Text style={[h1]}> Putri</Text>
          </View>

          <View style={[rowCenter, {marginTop: 20}]}>
            <AirbnbRating
              defaultRating={5}
              isDisabled
              showRating={false}
              size={10}
            />
            <Text style={[h1, {color: theme.colors.grey3}]}> 3 minggu lalu</Text>
          </View>
          
          <View style={styles.commentCard}>
            <Text>hasilnya bagus banget loh</Text>
          </View>

          <View style={styles.lineHorizontal} />
          
          <Text style={[h1, {fontSize: 18}]}>Penilaian Produk</Text>

          <View style={[rowCenter, {marginTop :20}]}>
            <View style={[rowCenter]}>
              <Text style={[h1, {fontSize: 21}]}>4.9</Text>
              <Image source={ic_star} style={[iconCustomSize(30), {tintColor: '#c8ad42'}]} />
            </View>

            <View style={{marginLeft: 10}}>
              <View style={{height: 0.5, width: WINDOW_WIDTH-120, backgroundColor: 'blue', marginBottom: 5}} />
              <View style={{height: 0.5, width: WINDOW_WIDTH-130, backgroundColor: 'blue', marginBottom: 5}} />
              <View style={{height: 0.5, width: WINDOW_WIDTH-140, backgroundColor: 'blue', marginBottom: 5}} />
              <View style={{height: 0.5, width: WINDOW_WIDTH-150, backgroundColor: 'blue', marginBottom: 5}} />
              <View style={{height: 0.5, width: WINDOW_WIDTH-160, backgroundColor: 'blue', marginBottom: 5}} />
              <View style={{height: 0.5, width: WINDOW_WIDTH-170, backgroundColor: 'blue', marginBottom: 5}} />
            </View>
          </View>

          <View style={styles.lineHorizontal} />
          
          <Text style={[{fontSize: 12, color: 'blue', alignSelf: 'flex-end'}]}>+ add review</Text>
        </View>
      </ScrollView>

      <View style={[rowCenter]}>
        <Button
          _theme="pink"
          onPress={() => checkCart(dataStore)}
          title="Chat"
          styleWrapper={{
            width: '20%',
            alignSelf: 'center',
            // bottom: 10,
            // right: 0,
            margin: 10,
            marginBottom: 20,
          }}
        />
        <Button
          _theme="pink"
          onPress={() => checkCart(dataStore)}
          title="Masukkan Keranjang"
          styleWrapper={{
            width: '70%',
            alignSelf: 'center',
            // bottom: 10,
            // right: 0,
            margin: 10,
            marginBottom: 20,
          }}
        />
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
    paddingHorizontal: 15,
    borderRadius: 10,
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
  lineHorizontal: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginVertical: 10,
  },
  commentCard: {
    height: 200,
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.grey7,
    marginTop: 20,
    borderRadius: 10,
    padding: 10
  }
});
