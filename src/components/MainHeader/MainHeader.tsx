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
import {rowCenter, iconCustomSize} from 'utils/mixins';
import {h1} from 'utils/styles';
import {useNavigation} from '@react-navigation/native';
import { useDrawerStore } from 'store/effects/drawerStore';

const MainHeader = () => {
  const navigation = useNavigation();
  const openDrawer = useDrawerStore() as any;

  return (
    <View style={styles.headerWrapper}>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <View style={rowCenter}>
          <TouchableOpacity onPress={()=> {
              openDrawer.toggleDrawer({isShowDrawer: !openDrawer.isShowDrawer})
          }}>
            <Image
              source={ic_menu}
              style={[iconCustomSize(30), {borderRadius: 4}]}
            />
          </TouchableOpacity>
          <Text style={[h1, {fontSize: 15, color: '#fff', marginLeft: 10}]}>
            MENU
          </Text>
        </View>

        <View style={[rowCenter]}>
          <TouchableOpacity onPress={() => navigation.navigate('CartList')}>
            <Image
              source={ic_cart}
              style={[iconCustomSize(30), {marginRight: 10, borderRadius: 4}]}
            />
          </TouchableOpacity>
          <Image
            source={ic_chat}
            style={[iconCustomSize(30), {borderRadius: 4}]}
          />
        </View>
      </View>

      <View style={[rowCenter, styles.searchWrapper]}>
        <TextInput placeholder="Pencarian Salon & produk" />
        <Image
          source={ic_search}
          style={[iconCustomSize(30), {borderRadius: 4}]}
        />
      </View>
    </View>
  );
};

export default MainHeader;

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
});
