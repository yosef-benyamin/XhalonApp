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
import React, {useCallback, useEffect, useState} from 'react';
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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import GridFlatList from 'grid-flatlist-react-native';
import HomeItemCard from './SalonDetailScreen/ItemCard';
import {currencyFormat} from 'utils/currencyFormat';
import {useProductStore} from 'store/actions/ProductStore';
import {IProduct} from 'types/products.types';
import ProductCard from 'components/ProductCard';
import HeaderCarousel from './HeaderCarousel';
import ChipSelect from 'components/Chip/ChipSelect';

const HomeScreen = () => {
  const route = useRoute<any>();
  // const ANALISA_ID_GLOBAL = route?.params?.ANALISA_ID_GLOBAL || '';
  const [selectedCategory, setSelectedCategory] = useState(0);

  const navigation = useNavigation();
  const ProductStore = useProductStore(state => state);

  useFocusEffect(
    useCallback(() => {
      let x = ProductStore?.category?.findIndex(
        X => X.ANALISA_ID === route?.params?.ANALISA_ID_GLOBAL,
      );
      console.log('fiond fiof = ', x, route?.params);
      if (x) {
        setSelectedCategory(x);
      }
    }, [navigation]),
  );

  useEffect(() => {
    // ProductStore.getStore();
    ProductStore.getGroupCategory();
    ProductStore.getProduct();
    ProductStore.getCategory();
  }, [navigation]);

  const renderItem: any = useCallback(
    (item: IProduct) => <ProductCard item={item} />,
    [],
  );

  const [chipSelect, setChipSelect] = useState('');

  useEffect(() => {
    ProductStore.filterProduct(chipSelect)
    return () => {
      
    }
  }, [chipSelect])
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <ScrollView nestedScrollEnabled>
        <HeaderCarousel />
        {/* {console.log('group = ', ProductStore?.groupCategory)} */}
        {/* <View style={[rowCenter, {margin: 16}]}>
          <ScrollView horizontal>
            {ProductStore?.category.map((x, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.typeWrapper,
                  {
                    borderBottomWidth: selectedCategory === i ? 1 : 0,
                  },
                ]}
                onPress={()=> ProductStore.filterProduct(x?.ANALISA_ID)}
                >
                <Text
                  style={[
                    h2,
                    {
                      color:
                        selectedCategory === i ? theme.colors.pink : '#616161',
                      fontSize: 18,
                      marginTop: 5,
                    },
                  ]}>
                  {x?.KET_ANALISA}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}

        <View style={{margin: 16}}>
          <ScrollView horizontal>
            {/* {[{KET_ANALISA: 'Semua', ANALISA_ID: ''},...ProductStore?.category].map((x, i) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  margin: 5,
                  elevation: 4,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  marginRight: 10,
                }}
                onPress={()=> ProductStore.filterProduct(x?.ANALISA_ID)}
                >
                <Text style={{color: theme.colors.pink}}>{x?.KET_ANALISA}</Text>
              </TouchableOpacity>
            ))} */}
            <ChipSelect
              items={ProductStore?.category?.map((x, i) => x.KET_ANALISA)}
              selected={chipSelect}
              setSelected={setChipSelect}
            />
          </ScrollView>
        </View>

        <View style={{marginHorizontal: 16}}>
          <GridFlatList
            data={[...ProductStore?.product]}
            // data={[]}
            renderItem={renderItem}
            keyExtractor={(_item, index) => `${index}`}
            numColumns={2}
            style={{
              backgroundColor: theme.colors.white,
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
    borderBottomColor: theme.colors.pink,
    borderBottomWidth: 1,
    marginRight: 20,
  },
});
