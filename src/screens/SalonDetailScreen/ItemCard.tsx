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

const HomeItemCard = ({data}: {data: IProduct}) => {
  // console.log('data = ', data);

  const cartStore: CartState = useCartStore();

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // cartStore.deleteAllCart();
  }, []);

  useEffectSkipInitialRender(()=> {
    // setTimeout(() => {
      handleAddCart();
    // }, 200);
  },[isDelete]);

  const checkCart = () => {
    console.log('data = ', data);
    console.log(
      'check store = ',
      cartStore?.cart?.COMPANY_ID,
      data?.COMPANY_ID,
    );
    if (
      typeof cartStore?.cart?.COMPANY_ID === 'string' &&
      cartStore?.cart?.COMPANY_ID !== data?.COMPANY_ID
    ) {
      Alert.alert('PERINGATAN', 'Apakah anda mau mengganti SALON ?', [
        {
          text: 'TIDAK',
        },
        {
          text: 'IYA',
          onPress: async () => {
            cartStore.deleteAllCart();
            setIsDelete(true)
            // setTimeout(() => {
            //   handleAddCart();
            // }, 200);
          },
        },
      ]);
    } else {
      handleAddCart();
    }
  };
  const handleAddCart = () => {
    // console.log('data = ', data);

    let _items = deepClone(cartStore?.cart?.ITEMS || []) || [];
    console.log('_items = ', _items);
    if (_items?.length <= 0) {
      _items.push({
        SALES_ID: '215192B0A720933892E',
        ...data,
        QTY: '1',
      });
    } else {
      const id = _items.findIndex((x: any) => x?.PART_ID === data?.PART_ID);

      console.log('findid = ', id);
      if (id !== -1) {
        console.log('masuk fi');
        let _ = JSON.parse(_items[id].QTY);
        _items[id].QTY = JSON.stringify(_ + 1);
      } else {
        console.log('masuk else');
        _items.push({
          SALES_ID: '215192B0A720933892E',
          QTY: '1',
          ...data
        });
      }
    }

    console.log('_items = ', _items);

    cartStore.saveToCart({
      ITEMS: _items,
      COMPANY_ID: data?.COMPANY_ID,
    });
  };

  return (
    <View
      style={{
        elevation: 3,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
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
        <Text>{data?.KET_ANALISA_GLOBAL}</Text>
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

      <TouchableOpacity style={styles.addBox} onPress={checkCart}>
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
