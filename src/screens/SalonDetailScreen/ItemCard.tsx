import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {img_barber} from 'assets/images';
import {deepClone, theme} from 'utils';
import {currencyFormat} from 'utils/currencyFormat';
import {h1, h5} from 'utils/styles';
import {IProduct} from 'types/products.types';
import {BASE_URL} from '@env';
import {useCartStore} from 'store/actions/cartStore';
import {CartState} from 'types/cart.types';
import useEffectSkipInitialRender from 'utils/useEffectSkipInitialRender';
import { checkCart } from 'utils/addToCart';
import { ic_broken_image } from 'assets/icons';

const HomeItemCard = ({item}: {item: IProduct}) => {

  return (
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
  );
};

export default HomeItemCard;

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
