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
import React, { useEffect } from 'react';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {ic_cart, ic_chat, ic_haircut, ic_menu, ic_search} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import {ic_beard, img_barber, img_boy, img_dash} from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import MainHeader from 'components/MainHeader/MainHeader';
import { useNavigation } from '@react-navigation/native';
import { useProductStore } from 'store/actions/ProductStore';

const HomeScreen = () => {
  const navigation = useNavigation();

  const ProductStore = useProductStore((state) => state);

  // console.log('ProductStore = ', ProductStore.store)

  useEffect(() => {
    ProductStore.getStore();
    ProductStore.getGroupCategory();
    ProductStore.getProduct();
    ProductStore.getCategory();
  }, [navigation]);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView nestedScrollEnabled>
        {
          //*start of header section
        }
        <MainHeader />
        {
          //*end of header section
        }

        <View style={{marginTop: -30}}>
          <Carousel
            loop
            width={WINDOW_WIDTH}
            height={WINDOW_WIDTH / 2}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            // onSnapToItem={index => console.log('current index:', index)}
            renderItem={({index}) => (
              <View
                style={[
                  rowCenter,
                  styles.sliderImgWrapper,
                  {marginHorizontal: 10},
                ]}>
                <View style={{padding: 20, width: '60%'}}>
                  <Text style={[h1, {color: '#fff'}]}>
                    Collection hair & beard
                  </Text>
                  <Text style={[h5, {color: '#fff'}]}>
                    here are many variations of passages of Lorem Ipsum
                    available
                  </Text>
                  <View style={styles.boxService}>
                    <Text style={[h1, {color: '#fff'}]}>See All services</Text>
                  </View>
                </View>
                <Image
                  source={img_boy}
                  style={{
                    width: 100,
                    height: 120,
                  }}
                />
              </View>
            )}
          />
        </View>

        <View style={[rowCenter, {margin: 16}]}>
          {[...Array(6).fill(0)].map((x, i) => (
            <TouchableOpacity key={i} style={styles.typeWrapper}>
              <Image source={ic_haircut} style={iconSize} />
              <Text
                style={[
                  h2,
                  {color: theme.colors.pink, fontSize: 10, marginTop: 5},
                ]}>
                Rambut
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
              {[...Array(6).fill(0)].map((x, i) => (
                <View>
                  <Image
                    source={ic_beard}
                    style={{
                      width: 70,
                      height: 53,
                      marginRight: 10,
                    }}
                  />
                  <Text style={h4}>Beard</Text>
                </View>
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
              {[...ProductStore?.store].map((x, i) => (
                <TouchableOpacity onPress={()=> navigation.navigate('SalonDetail', {
                  dataStore: x
                })}>
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
  sliderImgWrapper: {
    // width: WINDOW_WIDTH,
    // height: 150,
    backgroundColor: '#000',
    // marginRight: 10,
    // marginLeft: 0,
    // paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  boxService: {
    borderWidth: 3,
    borderColor: 'yellow',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
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
