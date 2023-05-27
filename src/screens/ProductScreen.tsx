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
import {ic_cart, ic_chat, ic_crown, ic_haircut, ic_love, ic_menu, ic_pinpoin, ic_search, ic_stars} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import {ic_beard, img_barber, img_boy, img_dash} from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import MainHeader from 'components/MainHeader/MainHeader';
import {useNavigation} from '@react-navigation/native';
import GridFlatList from 'grid-flatlist-react-native';
import HomeItemCard from './SalonDetailScreen/ItemCard';
import { currencyFormat } from 'utils/currencyFormat';
import { useProductStore } from 'store/actions/ProductStore';
import { IProduct } from 'types/products.types';

const HomeScreen = () => {
  const navigation = useNavigation();
  const ProductStore = useProductStore(state => state);
  
  useEffect(() => {
    // ProductStore.getStore();
    ProductStore.getGroupCategory();
    ProductStore.getProduct();
    ProductStore.getCategory();
  }, [navigation]);

  const renderItem: any = useCallback(
    (item: IProduct) => (
      <TouchableOpacity style={{
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10
      }}>
        <Image source={img_barber} style={{height: 123, width: '100%'}} />
        <View style={[rowCenter, {justifyContent: 'space-between', alignItems: 'flex-start'}]}>
          <View>
            <Text style={[h2]}>{item?.KET_ANALISA}</Text>
            <Text style={[h4, {fontSize: 12}]}>{currencyFormat(item?.UNIT_PRICE)}</Text>

            <Text style={{fontSize: 10}}>{item?.DISCOUNT_VAL}% <Text>{currencyFormat(item?.UNIT_PRICE_NET)}</Text></Text>

            <View style={rowCenter}>
              <Image source={ic_crown} style={iconSize} resizeMode={'contain'} />
              <Text>{item?.COMPANY_NAME}</Text>
            </View>

            <Text>buka pukul 09:00 sampai 18:00 senin - minggu</Text>

            <View style={rowCenter}>
              <Image source={ic_pinpoin} style={iconSize} resizeMode={'contain'} />
              <Text>Jakarta Kota</Text>
            </View>

            <View style={rowCenter}>
              <Image source={ic_stars} style={{width: 50, height: 10}} resizeMode={'contain'} />

              <Text>5.0 | Terjual 10Rb</Text>
            </View>
          </View>

          <Image source={ic_love} style={iconSize} resizeMode={'contain'} />
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
          {console.log('group = ', ProductStore?.groupCategory)}
        <View style={[rowCenter, {margin: 16}]}>
          <ScrollView horizontal>
            {ProductStore?.groupCategory.map(
              (x, i) => (
                <TouchableOpacity key={i} style={styles.typeWrapper}>
                  <Text
                    style={[
                      h2,
                      {color: theme.colors.pink, fontSize: 18, marginTop: 5},
                    ]}>
                    {x?.GROUP_ANALISA_NAME}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>
        </View>

        <View style={{margin: 16,}}>
          <ScrollView horizontal>
            {ProductStore?.category.map((x, i) => (
              <TouchableOpacity style={{
                padding: 10,
                margin: 5,
                elevation: 4,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginRight: 10
              }}>
                <Text style={{color: theme.colors.pink}}>{x?.KET_ANALISA}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <GridFlatList
          data={[...ProductStore?.product]}
          // data={[]}
          renderItem={renderItem}
          keyExtractor={(_item, index) => `${index}`}
          numColumns={2}
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
          gap={10}
          accessibilityComponentType={undefined}
          accessibilityTraits={undefined}
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
});
