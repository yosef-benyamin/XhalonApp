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
import {h1} from 'utils/styles';
import {IProduct} from 'types/products.types';
import {BASE_URL} from '@env';
import {useCartStore} from 'store/actions/cartStore';
import {CartState} from 'types/cart.types';
import useEffectSkipInitialRender from 'utils/useEffectSkipInitialRender';
import { checkCart } from 'utils/addToCart';

const HomeItemCard = ({data}: {data: IProduct}) => {

  return (
    <View
      style={{
        elevation: 3,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,width: 156,
      }}>
      <Image
        source={{uri: BASE_URL + '/' + data?.MAIN_IMAGE}}
        style={{
          width: 156,
          height: 123,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <View
        style={{
          padding: 10,
        }}>
        <Text>{data?.PART_NAME}</Text>
        <Text style={[h1]}>{currencyFormat(data?.UNIT_PRICE)}</Text>
        {data?.UNIT_PRICE !== data?.UNIT_PRICE_NET && (
          <Text style={{color: theme.colors.pink}}>
            50%{' '}
            <Text style={{textDecorationLine: 'line-through'}}>
              {currencyFormat(data?.UNIT_PRICE_NET)}
            </Text>
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.addBox} onPress={()=> checkCart(data)}>
        <Text style={{color: theme.colors.pink}}>+ keranjang</Text>
      </TouchableOpacity>
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
