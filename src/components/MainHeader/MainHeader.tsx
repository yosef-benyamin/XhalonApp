import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ic_menu, ic_cart, ic_chat, ic_search} from 'assets/icons';
import {theme} from 'utils';
import {rowCenter, iconCustomSize, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h5} from 'utils/styles';
import {useNavigation} from '@react-navigation/native';
import {useDrawerStore} from 'store/effects/drawerStore';
import {useCartStore} from 'store/actions/cartStore';
import {CartState} from 'types/cart.types';

const MainHeader = () => {
  const navigation = useNavigation();
  const openDrawer = useDrawerStore() as any;
  const cartStore: CartState = useCartStore();

  return (
    <View style={styles.headerWrapper}>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <View style={rowCenter}>
          <TouchableOpacity
            onPress={() => {
              openDrawer.toggleDrawer({isShowDrawer: !openDrawer.isShowDrawer});
            }}>
            <Image
              source={ic_menu}
              style={[iconCustomSize(35), {borderRadius: 4}]}
            />
          </TouchableOpacity>
          {/* <Text style={[h1, {fontSize: 15, color: '#fff', marginLeft: 10}]}>
            MENU
          </Text> */}
        </View>

        <View style={[rowCenter]}>
          <TouchableOpacity onPress={() => navigation.navigate('CartList')}>
            <Image
              source={ic_cart}
              style={[
                iconCustomSize(35),
                {
                  marginRight: 20,
                  borderRadius: 4,
                },
              ]}
            />

            <View style={styles.ballCart}>
              <Text
                style={{
                  fontSize: 9,
                  color: theme.colors.pink,
                }}>
                {cartStore?.cart?.ITEMS?.length}
              </Text>
            </View>
          </TouchableOpacity>
          <Image
            source={ic_chat}
            style={[iconCustomSize(35), {borderRadius: 4}]}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={[rowCenter, styles.searchWrapper]}>
        <Text style={[h5, {color: '#666', fontSize: 16}]}>Pencarian Salon & Produk</Text>
        <Image
          source={ic_search}
          style={[
            iconCustomSize(25),
            {borderRadius: 4, marginRight: 10, tintColor: theme.colors.grey4},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  searchWrapper: {
    // backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: theme.colors.grey7,
    // justifyContent: 'space-between',
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
    borderRadius: 50,
    height: 70,
    width: 70,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ballCart: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    height: 20,
    width: 20,
    top: -10,
    right: 10,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WINDOW_WIDTH / 2,
  },
});
