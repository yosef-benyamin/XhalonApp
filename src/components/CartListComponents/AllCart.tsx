import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {iconCustomSize, iconSize, rowCenter, WINDOW_WIDTH} from 'utils/mixins';
import {ic_arrow_right, ic_check, ic_uncheck} from 'assets/icons';
import {h2, h3, h4} from 'utils/styles';
import {deepClone, theme} from 'utils';
import {img_gell} from 'assets/images';
import Button from 'components/Button';
import {useNavigation} from '@react-navigation/native';
import {useCartStore} from 'store/actions/cartStore';
import {CartState, IItems} from 'types/cart.types';
import {useProductStore} from 'store/actions/ProductStore';
import {BASE_URL} from '@env';
import {currencyFormat} from 'utils/currencyFormat';
const AllCart = () => {
  const cartStore: CartState = useCartStore();
  const store = useProductStore(state => state.store);

  const navigation = useNavigation();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    checkTotal();
    return () => {};
  }, [navigation, cartStore?.cart?.ITEMS]);

  const checkTotal = () => {
    let sum = 0;
    cartStore?.cart?.ITEMS?.map((x, i) => {
      if (x?.IS_SELECTED) {
        sum += x?.UNIT_PRICE_NET;
      }
    });
    setTotal(sum);
  };

  const handleAddQty = (item: IItems) => {
    let _items: IItems[] = deepClone(cartStore?.cart?.ITEMS || []) || [];
    let id: number = _items?.findIndex(x => x?.PART_ID === item.PART_ID);

    if (id !== -1) {
      let _ = JSON.parse(_items[id].QTY);
      _items[id].QTY = JSON.stringify(_ + 1);

      cartStore.saveToCart({
        ITEMS: _items,
        COMPANY_ID: cartStore?.cart?.COMPANY_ID,
      });
    }
  };

  const handleReduceQty = (item: IItems) => {
    let _items: IItems[] = deepClone(cartStore?.cart?.ITEMS || []) || [];
    let id: number = _items?.findIndex(x => x?.PART_ID === item.PART_ID);

    if (id !== -1) {
      let _ = JSON.parse(_items[id].QTY);

      if (_ - 1 === 0) {
        Alert.alert(
          'PERINGATAN',
          'Apakah anda yakin untuk menghapus item ini ?',
          [
            {
              text: 'tidak',
            },
            {
              text: 'iya',
              onPress: () => {
                _items.splice(id, 1);

                console.log('_items?.length = ', _items?.length);
                if (_items?.length <= 0) {
                  console.log('masuk if');
                  cartStore.deleteAllCart();
                  return;
                }

                cartStore.saveToCart({
                  ITEMS: _items,
                  COMPANY_ID: cartStore?.cart?.COMPANY_ID,
                });
              },
            },
          ],
        );
        return;
      } else {
        _items[id].QTY = JSON.stringify(_ - 1);
      }

      cartStore.saveToCart({
        ITEMS: _items,
        COMPANY_ID: cartStore?.cart?.COMPANY_ID,
      });
    }
  };

  const handleSelect = (item: IItems, i: number) => {
    let _items: IItems[] = deepClone(cartStore?.cart?.ITEMS || []) || [];
    let id: number = _items?.findIndex(x => x?.PART_ID === item.PART_ID);

    _items[id].IS_SELECTED = !_items[id].IS_SELECTED;

    cartStore.saveToCart({
      ITEMS: _items,
      COMPANY_ID: cartStore?.cart?.COMPANY_ID,
    });
  };

  const handleSelectStore = () => {
    let _items: IItems[] = deepClone(cartStore?.cart?.ITEMS || []) || [];
    const isUnSelectAll: any = cartStore?.cart?.ITEMS?.find(
      x => !x.IS_SELECTED,
    );

    [..._items]?.map((x, i) => {
      _items[i].IS_SELECTED = isUnSelectAll;
    });

    cartStore.saveToCart({
      ITEMS: _items,
      COMPANY_ID: cartStore?.cart?.COMPANY_ID,
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 30}}>
        {cartStore?.cart?.ITEMS?.length! > 0 && (
          <>
            <View style={[rowCenter, {justifyContent: 'space-between'}]}>
              <View style={[rowCenter]}>
                <TouchableOpacity onPress={handleSelectStore}>
                  <Image
                    source={
                      cartStore?.cart?.ITEMS?.find(x => !x.IS_SELECTED)
                        ? ic_uncheck
                        : ic_check
                    }
                    style={iconSize}
                  />
                </TouchableOpacity>
                <Text style={[h2, {marginHorizontal: 7}]}>
                  {
                    store?.find(
                      x => x.COMPANY_ID === cartStore?.cart?.COMPANY_ID,
                    )?.COMPANY_NAME
                  }
                </Text>
                <Image source={ic_arrow_right} style={iconSize} />
              </View>
              <Text style={[h2, {}]}>ubah</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.grey6,
                marginTop: 10,
              }}
            />
          </>
        )}

        {cartStore?.cart?.ITEMS?.map((x, i) => (
          <View style={[rowCenter, {marginTop: 20}]}>
            <TouchableOpacity onPress={() => handleSelect(x, i)}>
              <Image
                source={x?.IS_SELECTED ? ic_check : ic_uncheck}
                style={iconSize}
              />
            </TouchableOpacity>
            <Image
              source={{uri: BASE_URL + '/' + x?.MAIN_IMAGE}}
              style={[
                iconCustomSize(90),
                {borderRadius: 8, marginHorizontal: 10},
              ]}
            />
            <View>
              <Text></Text>
              <Text
                style={[
                  h4,
                  {
                    padding: 5,
                    borderRadius: 5,
                    backgroundColor: theme.colors.grey7,
                    marginVertical: 10,
                  },
                ]}>
                Variasi: {x?.KET_ANALISA_GLOBAL}
              </Text>
              <View style={rowCenter}>
                <Text
                  style={[
                    h3,
                    {
                      color: theme.colors.grey4,
                      textDecorationLine: 'line-through',
                    },
                  ]}>
                  {currencyFormat(x?.UNIT_PRICE)}
                </Text>
                <Text
                  style={{
                    textDecorationLine: 'none',
                    color: theme.colors.pink,
                    marginLeft: 5,
                  }}>
                  {currencyFormat(x?.UNIT_PRICE_NET)}
                </Text>
              </View>

              <View style={[rowCenter, {marginTop: 10}]}>
                <TouchableOpacity
                  style={styles.icCount}
                  onPress={() => handleReduceQty(x)}>
                  <Text>-</Text>
                </TouchableOpacity>

                <TextInput style={styles.inputQty} value={x.QTY} />

                <TouchableOpacity
                  style={styles.icCount}
                  onPress={() => handleAddQty(x)}>
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={[rowCenter, styles.footerWrapper]}>
        <Image source={ic_uncheck} style={iconSize} />

        <View style={[rowCenter]}>
          <View style={{alignItems: 'flex-end', marginRight: 10}}>
            <Text style={[h3, {color: theme.colors.grey3}]}>
              Total Pembayaran
            </Text>
            <Text style={[h3, {color: theme.colors.pink}]}>
              {currencyFormat(total)}
            </Text>
          </View>
          <Button
            title="pesan sekarang"
            _theme="pink"
            onPress={() => {
              navigation.navigate('BookingOrder');
            }}
            styleWrapper={{width: '50%'}}
          />
        </View>
      </View>
    </View>
  );
};

export default AllCart;

const styles = StyleSheet.create({
  inputQty: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    // width: 24,
    minWidth: 24,
    height: 24,
    borderWidth: 1,
    borderColor: theme.colors.grey4,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    padding: 5,
  },
  icCount: {
    borderWidth: 0.5,
    borderColor: theme.colors.grey4,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: '#fff',
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 20,
    paddingVertical: 10,
    width: WINDOW_WIDTH,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
});
