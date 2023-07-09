import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  ic_crown,
  ic_pinpoin,
  ic_stars,
  ic_love,
  ic_heart,
  ic_heart_line,
  ic_broken_image,
  ic_store_active,
  ic_cart,
  ic_add_cart,
} from 'assets/icons';
import {img_barber} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import {rowCenter, iconSize, iconCustomSize, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h4, h5} from 'utils/styles';
import {useNavigation} from '@react-navigation/native';
import {IProduct} from 'types/products.types';
import {useFavoriteStore} from 'store/actions/favoritStore';
import {addFavorit, deleteFavorit} from 'store/effects/favoritStore';
import {BASE_URL} from '@env';
import {theme} from 'utils';
import {checkCart} from 'utils/addToCart';
import {useProductStore} from 'store/actions/ProductStore';
import {AirbnbRating} from 'react-native-ratings';

const ProductCard = ({item, func}: {item: IProduct; func?: any}) => {
  const navigation = useNavigation();
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
  const ProductStore = useProductStore(state => state);

  return (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => {
        if (func) func();
        setTimeout(() => {
          navigation.navigate('ProductDetail', {
            dataProduct: item,
          });
        }, 0);
      }}>
      <View>
        <Image
          source={
            item?.MAIN_IMAGE
              ? {uri: BASE_URL + '/' + item?.MAIN_IMAGE}
              : ic_broken_image
          }
          style={{height: 123, width: '100%'}}
        />
      </View>
      <View
        style={[
          rowCenter,
          {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 10,
          },
        ]}>
        <View>
          <View style={{width: WINDOW_WIDTH / 2.5}}>
            <Text style={[h1, {fontSize: 14}]}>{item?.PART_NAME}</Text>
          </View>

          <View>
            {item?.DISCOUNT_VAL === 0 && (
              <Text style={[h1, {fontSize: 10, fontWeight: '400'}]}>
                {currencyFormat(item?.UNIT_PRICE)}
              </Text>
            )}

            {item?.DISCOUNT_VAL === 0 && (
              <Text style={{fontSize: 7, color: 'red'}}>
                {`${item?.DISCOUNT_VAL}% `}
                <Text style={[h1, {fontSize: 10, fontWeight: '400'}]}>
                  {currencyFormat(item?.UNIT_PRICE_NET)}
                </Text>
              </Text>
            )}
          </View>

          <View style={[rowCenter, {marginVertical: 5}]}>
            <Image
              source={ic_crown}
              style={{height: 13, width: 17}}
              resizeMode="stretch"
            />
            <Text style={{fontSize: 15, fontWeight: '400'}}>
              {' '}
              {item?.COMPANY_NAME}
            </Text>
          </View>

          <Text style={{fontSize: 8, fontWeight: '500'}}>
            {'Buka Pukul '}
            {
              ProductStore?.store?.find(x => x.COMPANY_ID === item?.COMPANY_ID)
                ?.OPERATIONAL_HOUR
            }
          </Text>

          <Text style={{fontSize: 8, fontWeight: '500'}}>
            {
              ProductStore?.store?.find(x => x.COMPANY_ID === item?.COMPANY_ID)
                ?.OPERATIONAL_DAY
            }
          </Text>

          <View style={[rowCenter, {marginVertical: 5}]}>
            <Image
              source={ic_pinpoin}
              style={iconCustomSize(15)}
              resizeMode="stretch"
            />
            <Text style={{fontSize: 10, fontWeight: '500', marginLeft: 5}}>
              {
                ProductStore?.store?.find(
                  x => x.COMPANY_ID === item?.COMPANY_ID,
                )?.KOTA_NAME
              }
            </Text>
          </View>

          <View style={[rowCenter]}>
            <AirbnbRating
              count={5}
              defaultRating={parseInt(item?.RATING_STORE || 5)}
              size={10}
              showRating={false}
              isDisabled
            />
            <Text style={{fontSize: 10, fontWeight: '400'}}>{'5'} | </Text>
            <Text style={{fontSize: 10, fontWeight: '400'}}>Terjual 10Rb</Text>
          </View>
        </View>
        <View />

        <TouchableOpacity
          style={styles.heartWrapper}
          onPress={() => {
            console.log(
              'part id = ',
              favoriteStore?.listFavorite?.find(
                x => x?.NO_TRX === item?.PART_ID,
              ),
            );
            if (
              favoriteStore?.listFavorite?.find(
                x => x?.PART_ID === item?.PART_ID,
              )?.PART_ID
            ) {
              handleDeleteFav(item.PART_ID);
            } else {
              handleAddFav(item.PART_ID);
            }
          }}>
          <Image
            source={
              favoriteStore?.listFavorite?.find(
                x => x?.PART_ID === item?.PART_ID,
              )?.PART_ID
                ? ic_heart
                : ic_heart_line
            }
            style={[iconCustomSize(17), {}]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardWrapper: {
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 10,
    margin: 5,
  },
  heartWrapper: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 30,
    width: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: theme.colors.grey6,
  },
  storeWrapper: {
    position: 'absolute',
    backgroundColor: 'rgba(244, 244, 244, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    bottom: 5,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addCart: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 4,
    backgroundColor: theme.colors.low_pink,
  },
});
