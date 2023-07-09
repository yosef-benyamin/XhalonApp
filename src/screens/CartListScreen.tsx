import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconSize, rowCenter} from 'utils/mixins';
import {ic_arrow_left_black, ic_arrow_left_white, ic_chat} from 'assets/icons';
import {h1, h2} from 'utils/styles';
import {theme} from 'utils';
import AllCart from 'components/CartListComponents/AllCart';
import { CartState } from 'types/cart.types';
import { useCartStore } from 'store/actions/cartStore';

type ITabKeys = 'semua' | 'diskon' | 'pesan_lagi';

interface ITabs {
  title: string;
  keys: ITabKeys;
}

const CartListScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<ITabKeys>('semua');
  const cartStore: CartState = useCartStore();
  const TABS: ITabs[] = [
    {
      title: `Semua(${cartStore?.cart?.ITEMS?.length || ''})`,
      keys: 'semua',
    },
    // {
    //   title: 'Diskon',
    //   keys: 'diskon',
    // },
    // {
    //   title: 'Pesan Lagi',
    //   keys: 'pesan_lagi',
    // },
  ];
  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={rowCenter}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_black}
              style={{
                height: 20,
                width: 20,
                marginLeft: 16,
              }}
            />
            <Text style={[h1, {color: '#000', marginLeft: 10}]}>
              Keranjang Saya
            </Text>
          </TouchableOpacity>
        ),
        trailing: (
          <TouchableOpacity style={{marginRight: 16}}>
            <Image source={ic_chat} style={[iconSize, {tintColor: theme.colors.low_pink}]} />
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={{flex: 1, padding: 16, backgroundColor: '#fff'}}>
      <View style={[rowCenter, {}]}>
        {TABS.map((x, i) => (
          <TouchableOpacity
            onPress={() => setSelectedTab(x.keys)}
            style={
              selectedTab === x.keys ? styles.selectedTab : styles.unselectedTab
            }>
            <Text style={[h2, {color: selectedTab === x.keys? theme.colors.pink : theme.colors.grey5}]}>{x.title}</Text>
          </TouchableOpacity>
        ))}        
      </View>
      {selectedTab === 'semua' && <AllCart/>}
    </View>
  );
};

export default CartListScreen;

const styles = StyleSheet.create({
  selectedTab: {
    width: '33%',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.pink,
    paddingVertical: 10,
    alignItems: 'center',
  },
  unselectedTab: {
    width: '33%',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.grey6,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
