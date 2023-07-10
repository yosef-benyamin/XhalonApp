import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  iconCustomSize,
  iconSize,
  rowCenter,
} from 'utils/mixins';
import {theme} from 'utils';
import {img_barber} from 'assets/images';
import {h1, h2, h3, h5} from 'utils/styles';
import TopNavigation from './TopNavigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'types/navigator';
import {useProductStore} from 'store/actions/ProductStore';
import Loading from 'components/Loading';
import {Drawer} from 'react-native-drawer-layout';
import Button from 'components/Button';
import hoc from 'components/hoc';

type salonDetailScreenRouteProp = RouteProp<RootStackParamList, 'SalonDetail'>;

const SalonDetailScreen = () => {
  const route = useRoute<salonDetailScreenRouteProp>();
  const dataStore = route?.params.dataStore;
  const navigation = useNavigation();
  const ProductStore = useProductStore(state => state);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

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

  if (isLoading) return <Loading />;

  return (
    <>
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

        <ScrollView>
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
                <Text style={[h1, {marginLeft: 5, fontSize: 21}]}>
                  {' '}
                  {dataStore?.COMPANY_NAME}
                </Text>
              </View>
              <View style={[rowCenter, {marginVertical: 7}]}>
                {/* <Text style={[h2, {color: 'green'}]}>• Online</Text> */}
                <Text
                  style={[
                    h5,
                    {marginLeft: 0, fontSize: 16, color: theme.colors.grey4},
                  ]}>
                  {dataStore?.KOTA_NAME}
                </Text>
              </View>

              <View style={rowCenter}>
                <View style={[rowCenter]}>
                  <Image source={ic_star} style={[iconSize, {}]} />
                  <Text style={[h2, {color: theme.colors.grey0, fontSize: 16}]}>
                    {' '}
                    {dataStore?.RATING_STORE}
                  </Text>
                </View>

                <Text
                  style={[
                    h2,
                    {color: theme.colors.grey3, marginLeft: 10, fontSize: 16},
                  ]}>
                  {' '}
                  {'rata rata ulasan'}
                </Text>
              </View>
            </View>
          </View>

          <View style={{margin: 16}}>
            <Text style={[h1, {fontSize: 16}]}>Alamat Salon</Text>
            <View style={[rowCenter, {marginVertical: 10}]}>
              <Image
                source={ic_pinpoin}
                style={[iconCustomSize(17)]}
                resizeMode={'contain'}
              />
              <Text style={[h3, {fontSize: 16}]}> {dataStore?.ADDRESS}</Text>
            </View>
            <View style={[rowCenter]}>
              <Image
                source={ic_stars}
                style={{height: 20, width: 100}}
                resizeMode={'contain'}
              />
              <Text>({dataStore?.RATING_STORE}) 65 Reviews...</Text>
            </View>
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

          <TopNavigation
            COMPANY_ID={dataStore?.COMPANY_ID}
            open={open}
            setOpen={setOpen}
          />
        </ScrollView>
      </View>

      <Drawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        drawerStyle={{
          width: WINDOW_WIDTH - 20,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          // flex: 1,
          backgroundColor: open ? 'transparent' : '#fff',
          zIndex: !open ? -99 : 99,
        }}
        layout={{
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
        }}
        drawerPosition={'right'}
        renderDrawerContent={() => {
          return (
            <View style={{flex: 1, padding: 16}}>
              <ScrollView>
                <Text style={[h1, {fontSize: 16}]}>Filter</Text>

                <View style={[rowCenter, {flexWrap: 'wrap'}]}>
                  {[
                    'Produk Paling Laris',
                    'Produk Favorite',
                    'Produk Harga Terjangkau',
                    'Flashsale',
                    'Produk Review ulasan',
                  ]?.map((x, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: theme.colors.grey6,
                        padding: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                      }}>
                      <Text>{x}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[h1, {fontSize: 16, marginTop: 20}]}>
                  kategori
                </Text>

                <View style={[rowCenter, {flexWrap: 'wrap'}]}>
                  {[...ProductStore?.category]?.map((x, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: theme.colors.grey6,
                        padding: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                      }}>
                      <Text>{x?.KET_ANALISA}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[h1, {fontSize: 16, marginTop: 20}]}>Lokasi</Text>

                <View style={[rowCenter, {flexWrap: 'wrap'}]}>
                  {['Jabodetabek', 'Jawa Tengah', 'Jawa Barat']?.map((x, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: theme.colors.grey6,
                        padding: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                      }}>
                      <Text>{x}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[h1, {fontSize: 16, marginTop: 20}]}>Produk</Text>

                <View style={[rowCenter, {flexWrap: 'wrap'}]}>
                  {[
                    'Promo',
                    'FlashSale',
                    'Campaign',
                    'Diskon',
                    'Harga',
                    'Ranting',
                    'Lokasi',
                    'Review / Ulasan'
                  ]?.map((x, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{
                        backgroundColor: theme.colors.grey6,
                        padding: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        borderRadius: 10,
                      }}>
                      <Text>{x}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View style={[rowCenter, {justifyContent: 'space-between'}]}>
                <Button _theme='grey' title='Atur Ulang' onPress={()=> {}} styleWrapper={{width: '48%'}} />
                <Button _theme='pink' title='Pakai' onPress={()=> {}} styleWrapper={{width: '48%'}} />
              </View>
            </View>
          );
        }}></Drawer>
    </>
  );
};

export default hoc(SalonDetailScreen);

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
