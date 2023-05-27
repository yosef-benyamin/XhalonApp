import {
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {
  ic_cart,
  ic_chat,
  ic_crown,
  ic_haircut,
  ic_love,
  ic_menu,
  ic_pinpoin,
  ic_search,
  ic_stars,
} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import {ic_beard, img_barber, img_boy, img_dash} from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import MainHeader from 'components/MainHeader/MainHeader';
import {useNavigation} from '@react-navigation/native';
import GridFlatList from 'grid-flatlist-react-native';
import HomeItemCard from './SalonDetailScreen/ItemCard';
import {currencyFormat} from 'utils/currencyFormat';
import Button from 'components/Button';
import {useProductStore} from 'store/actions/ProductStore';
import {IStore} from 'types/products.types';

const HomeScreen = () => {
  const navigation = useNavigation();

  const ProductStore = useProductStore(state => state);

  // console.log('ProductStore = ', ProductStore);

  useEffect(() => {
    ProductStore.getStore();
  }, [navigation]);

  const renderItem: ListRenderItem<any> = useCallback(
    ({item}: {item: IStore}) => (
      <TouchableOpacity style={[rowCenter, {justifyContent: 'center'}]}>
        <Image
          source={img_barber}
          style={{width: 180, height: 150, borderRadius: 10, margin: 10}}
          resizeMode={'cover'}
        />

        <View style={styles.descWrapper}>
          <Text>{item?.COMPANY_NAME}</Text>
          <Text>{item?.OPERATIONAL_DAY}</Text>
          <Text>{item?.OPERATIONAL_HOUR}</Text>

          <Image
            source={ic_stars}
            style={{width: 50, height: 25}}
            resizeMode={'contain'}
          />

          <Button _theme="pink" title="Kunjungi" onPress={() => {}} />
        </View>
      </TouchableOpacity>
    ),
    [],
  );

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

        <Text style={[h1, {fontSize: 20, margin: 16}]}>Daftar Salon</Text>

        <FlatList
          data={[...ProductStore?.store]}
          // data={[]}
          renderItem={renderItem}
          keyExtractor={(_item, index) => `${index}`}
          style={{
            backgroundColor: theme.colors.cloud,
            width: '100%',
            alignSelf: 'center',
          }}
          ListFooterComponent={() => <View style={{marginBottom: 170}} />}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text>Produk Kosong</Text>
            </View>
          )}
        />
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
    borderBottomColor: theme.colors.pink,
    borderBottomWidth: 1,
    marginRight: 20,
  },
  descWrapper: {
    margin: 16,
    elevation: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    height: 150,
  },
});
