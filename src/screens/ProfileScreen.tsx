import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  KeyboardEvent,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ic_arrow_left_black, ic_search } from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import { iconCustomSize, iconSize, rowCenter } from 'utils/mixins';
import { h1, h2, h3, h4, h5 } from 'utils/styles';
import { ic_beard } from 'assets/images';
import { currencyFormat } from 'utils/currencyFormat';
import { listHistory } from 'store/effects/productStore';
import { IHistory, IProduct, IStore } from 'types/products.types';
import { useProductStore } from 'store/actions/ProductStore';
import { TextInput } from 'react-native';
import { theme } from 'utils';
import ChipSelect from 'components/Chip/ChipSelect';
import SalonCard from 'components/SalonCard';
import { calculateDistance, getLocation } from 'utils/getDistance';
import ProductCard from 'components/ProductCard';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.viewTopCard}>
        <View style={styles.viewSetting}>
          <Text style={styles.textProfile}>Profile Saya</Text>
          <View style={styles.viewIcon}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Image
                source={require('../assets/icons/setting.png')}
                style={styles.imgIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/icons/cart.png')}
              style={styles.imgIcon}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/icons/chat.png')}
              style={styles.imgIcon}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
              <Image
                source={require('../assets/icons/close.png')}
                style={styles.imgIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewImg}>
          <Image source={ic_beard} style={styles.img} />
          <TouchableOpacity onPress={() => navigation.navigate('ProfileDetail')} style={styles.viewBorderCard}>
            <Text style={styles.textNormal}>Cynthia Harris</Text>
            <Text style={styles.textNormal}>+62 (021) 353-3906</Text>
            <Text style={styles.textNormal}>Stefan.Peeters@Hotmail.Co.Uk</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewWallet}>
        <Image
          source={require('../assets/icons/wallet.png')}
          style={styles.imgWallet}
          resizeMode="contain"
        />
        <Text style={styles.textBlack}>Dompet Ku</Text>
      </View>
      <View style={styles.viewButton}>
        <View style={styles.button}>
          <Image
            source={require('../assets/icons/coin.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
          <Text style={styles.textNormal}>Point Ku</Text>
        </View>
        <View style={styles.button}>
          <Image
            source={require('../assets/icons/reward.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
          <Text style={styles.textNormal}>Reward</Text>
        </View>
        <View style={styles.button}>
          <Image
            source={require('../assets/icons/voucher.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
          <Text style={styles.textNormal}>Voucher</Text>
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/activity.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Aktivitas Saya</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text />
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/recent.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Terakhir Dilihat</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text />
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/order.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Pesanan Saya</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>Lihat Riwayat Pesanan</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/shop.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Salon Saya</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>10x Salon</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/adduser.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Member Xhalon</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>10x Member</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/heart.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Favorite Saya</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>10x Produk & Salon</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/stars.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Aktivitas Saya</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text />
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/voucher-pink.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Voucher Saya</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>10x Voucher</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  viewTopCard: {
    backgroundColor: theme.colors.pink,
    borderRadius: 20,
    padding: 5,
    justifyContent: 'space-around',
    height: 188,
    marginBottom: 10,
  },
  viewSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#88878F',
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  viewSubMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    shadowColor: '#000',
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  viewImg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIconMenu: {
    width: 15,
    height: 15,
  },
  viewIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#88878F',
    borderBottomWidth: 1,
    marginLeft: 10,
  },
  button: {
    width: 94,
    height: 55,
    alignItems: 'center',
    backgroundColor: theme.colors.pink,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  imgIcon: {
    margin: 4,
    height: 30,
    width: 30,
  },
  imgIconButton: {
    margin: 4,
    height: 19,
    width: 19,
  },
  imgWallet: {
    height: 11,
    width: 11,
  },
  viewBorderCard: {
    borderWidth: 2,
    borderRadius: 13,
    borderColor: theme.colors.white,
    justifyContent: 'space-around',
    padding: 8,
    width: '75%',
    height: 94,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 60,
    backgroundColor: theme.colors.grey0,
    margin: 10,
  },
  textProfile: {
    color: theme.colors.white,
    fontSize: 24,
    fontFamily: theme.Text.style.fontFamily,
    padding: 10,
  },
  textNormal: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  textBlack: {
    color: theme.colors.black,
    fontSize: 10,
    fontWeight: 'bold',
  },
  textBlackLarge: {
    color: theme.colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
  },
});
