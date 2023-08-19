import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import {img_japanese, img_user} from 'assets/images';
import {
  drawer_width,
  iconSize,
  rowCenter,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {h1, h4, h5} from 'utils/styles';
import { useAuthStore } from 'store/actions/AuthStore';
import { AuthState } from 'types/auth.types';
import { useDrawerStore } from 'store/effects/drawerStore';
import { useNavigation } from '@react-navigation/native';
// import {ic_wa} from 'assets/icons';

const MENU_DRAWERS = [
  {
    name: 'Home',
  },
  {
    name: 'Salon',
  },
  {
    name: 'Produk',
  },
  {
    name: 'Undian Office',
  },
  {
    name: 'Transaksi',
  },
  {
    name: 'Riwayat Pesanan',
  },
  {
    name: 'Pengaturan',
  },
  {
    name: 'Keluar',
  },
];
const Drawer = () => {
  const auth = useAuthStore(
    (state: any) => state,
  ) as AuthState;
  const openDrawer = useDrawerStore() as any;
  const navigation = useNavigation();

  const actionPress=async(name:string)=>{
    if(name === 'Keluar') {
      // auth.logout(auth.user?.USER_ID!, auth.user?.SESSION_LOGIN_INFO[0]?.SESSION_LOGIN_ID!);
      openDrawer.toggleDrawer({isShowDrawer: !openDrawer.isShowDrawer})
    } else if (name === 'profile') {
      openDrawer.toggleDrawer({isShowDrawer: !openDrawer.isShowDrawer});
      navigation.navigate('Profile');
    }
  }

  return (
    <View style={{flex: 1}}>
      {/* <Image
        source={img_japanese}
        style={styles.bgHeader}
        resizeMode={'cover'}
      /> */}
      <View style={styles.userWrapper}>
        {/* <Image source={img_user} style={styles.imgUser} /> */}
        <View style={{marginLeft: 20}}>
          <Text style={[h1, {marginBottom: 10}]}>Riko Saputra</Text>
          <Text style={h5} onPress={() => actionPress('profile')}>
            Lihat Profile
          </Text>
        </View>
      </View>
      <View style={{marginTop: WINDOW_HEIGHT / 3, marginLeft: 50}}>
        {MENU_DRAWERS.map((x, i) => (
          <Text
            key={i}
            onPress={()=> actionPress(x.name)}
            style={[
              h4,
              {
                marginBottom: 30,
              },
            ]}>
            {x.name}
          </Text>
        ))}
      </View>

      <View style={[rowCenter, styles.bottom]}>
        {/* <Image source={ic_wa} style={iconSize} /> */}
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => Linking.openURL('whatsapp://send?text=Halo CS&phone=+6282273321797')}>
          <Text>Whatsapp CS XHALONA</Text>
          <Text style={h1}>+6282273321797</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  bgHeader: {
    height: WINDOW_HEIGHT / 5,
    width: drawer_width,
    position: 'absolute',
    top: 0, 
  },
  imgUser: {
    height: 60,
    width: 60,
    borderRadius: WINDOW_WIDTH / 2,
  },
  userWrapper: {
    position: 'absolute',
    top: WINDOW_HEIGHT / 6.2,
    left: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 20,
    left: 36,
  },
});
