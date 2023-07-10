import {
  Image,
  ListRenderItem,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {h1, h3, h5} from 'utils/styles';
import {img_barber} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import {theme} from 'utils';
import HomeItemCard from './ItemCard';
import {useProductStore} from 'store/actions/ProductStore';
import ProductCard from 'components/ProductCard';
import GridFlatList from 'grid-flatlist-react-native';
import {BASE_URL} from '@env';
import {ic_broken_image, ic_filter, ic_grid} from 'assets/icons';
import {IProduct} from 'types/products.types';
import {checkCart} from 'utils/addToCart';
import {WINDOW_WIDTH, iconCustomSize, rowCenter} from 'utils/mixins';

const HomeTab = ({COMPANY_ID}: {COMPANY_ID: string}) => {
  const ProductStore = useProductStore(state => state);

  const renderItem: ListRenderItem<any> = useCallback(
    (item: IProduct) => (
      <View style={{elevation: 4, backgroundColor: '#fff', borderRadius: 10}}>
        <Image
          source={
            item?.MAIN_IMAGE
              ? {uri: BASE_URL + '/' + item?.MAIN_IMAGE}
              : ic_broken_image
          }
          style={{height: 123, width: '100%'}}
        />

        <View style={{padding: 10}}>
          <Text style={[h5, {fontSize: 16}]}>{item?.PART_NAME}</Text>
          <View>
            {item?.DISCOUNT_VAL === 0 && (
              <Text style={[h1, {fontSize: 20, fontWeight: '400'}]}>
                {currencyFormat(item?.UNIT_PRICE)}
              </Text>
            )}

            {item?.DISCOUNT_VAL !== 0 && (
              <Text style={{fontSize: 14, color: 'red'}}>
                {`${item?.DISCOUNT_VAL}% `}
                <Text style={[h1, {fontSize: 10, fontWeight: '400'}]}>
                  {currencyFormat(item?.UNIT_PRICE_NET)}
                </Text>
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => checkCart(item)}
            style={styles.addBox}>
            <Text style={{fontSize: 12, color: theme.colors.pink}}>
              Masukkan Keranjang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    [],
  );
  {
    /* <ProductCard item={ProductStore.product.find(x => x.PART_ID === item?.PART_ID)} /> */
  }
  return (
    <View>
      {/* <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <TouchableOpacity
          style={[
            rowCenter,
            {
              elevation: 4,
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
            },
          ]}>
          <Image source={ic_filter} style={iconCustomSize(20)} />
          <Text style={[h3, {color: theme.colors.pink}]}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            rowCenter,
            {
              // elevation: 4,
              // backgroundColor: '#fff',
              padding: 10,
              borderRadius: 5,
            },
          ]}>
          <Text style={[h3, {color: theme.colors.pink, marginRight: 5}]}>Tampilkan Semua</Text>
          <Image source={ic_grid} style={iconCustomSize(20)} />
        </TouchableOpacity>
      </View> */}

      <View>
        <Text
          style={[
            h1,
            {fontSize: 21, color: theme.colors.grey0, marginVertical: 10, },
          ]}>
          Promo Flash Sale{' '}
        </Text>
        <View
          style={{
            height: 200,
            width: WINDOW_WIDTH,
            left: -16,
            backgroundColor: theme.colors.low_pink,
            position: 'absolute',
            zIndex: -99,
            top: 0,
          }}
        />
        <GridFlatList
          data={ProductStore?.product?.filter(x => x.COMPANY_ID === COMPANY_ID)}
          renderItem={renderItem}
          keyExtractor={(_item, index) => `${index}`}
          numColumns={2}
          style={{
            backgroundColor: 'transparent',
            width: '100%',
            alignSelf: 'center',
            margin: 16,
          }}
          ListFooterComponent={() => <View style={{marginBottom: 10}} />}
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
      <Text
        style={[
          h1,
          {fontSize: 21, color: theme.colors.grey0, marginVertical: 10},
        ]}>
        BIKIN KAMU TERTARIK{' '}
      </Text>
      <GridFlatList
        data={ProductStore?.product?.filter(x => x.COMPANY_ID === COMPANY_ID)}
        // data={[]}
        renderItem={renderItem}
        keyExtractor={(_item, index) => `${index}`}
        // refreshControl={
        //   <RefreshControl refreshing={loader} onRefresh={()=> favoriteStore.getFavorite()} />
        // }
        numColumns={2}
        style={{
          backgroundColor: theme.colors.white,
          width: '100%',
          alignSelf: 'center',
          margin: 16,
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

      {/* <Text style={[h1]}>BIKIN KAMU TERTARIK</Text>

      <View>
        <ScrollView horizontal>
          {[...Array(10)].map((x, i) => (
            <HomeItemCard key={i} />
          ))}
        </ScrollView>
      </View> */}
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  addBox: {
    padding: 2,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.pink,
  },
});
