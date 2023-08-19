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
  ImageBackground,
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
import Button from 'components/Button';

const AccountScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.viewBg}>
        <ImageBackground style={styles.imgBg} source={require('../assets/icons/ic_ellipse_2.png')}>
          <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
            <Image
              source={require('../assets/icons/close.png')}
              style={styles.imgIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Text style={styles.textProfile}>Pengaturan Akun</Text>
      <View style={styles.viewImg}>
        <Image source={ic_beard} style={styles.img} />
        <View style={styles.viewBorderCard}>
          <Text style={styles.textNormal}>Upload Photo Kamu</Text>
          <TouchableOpacity style={styles.buttonUpload}>
            <Image
              source={require('../assets/icons/cloud-grey.png')}
              style={styles.imgIcon}
              resizeMode="contain"
            />
            <Text style={styles.textGrey}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewBody}>
        <Text style={styles.textTitle}>Nama Lengkap</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            placeholder="Masukan Nama Anda"
            style={styles.textField}
            editable={false}
          />
          <Image
            source={require('../assets/icons/identity.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <View style={styles.viewBornDate}>
          <View style={styles.viewHalf}>
            <Text style={styles.textTitle}>Tempat</Text>
            <View style={styles.viewTextInput}>
              <TextInput
                autoFocus={true}
                style={styles.textField}
                value='Jakarta'
                editable={false}
              />
            </View>
          </View>
          <View style={styles.viewHalf}>
            <Text style={styles.textTitle}>Tanggal Lahir</Text>
            <View style={styles.viewTextInput}>
              <TextInput
                autoFocus={true}
                style={styles.textField}
                value='06-11-1994'
                editable={false}
              />
            </View>
          </View>
        </View>
        <Text style={styles.textTitle}>Alamat Lengkap</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            multiline
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='121 KING STREET Eddy street and Gough street, San Francisco, CA 94109'
          />
          <Image
            source={require('../assets/icons/ic_pinpoin.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>Kelurahan</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='Cawang'
          />
          <Image
            source={require('../assets/icons/ic_pinpoin.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>Kecamatan</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='Keramat Jati'
          />
          <Image
            source={require('../assets/icons/ic_pinpoin.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>Provinsi</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='Dki Jakarta'
          />
          <Image
            source={require('../assets/icons/ic_pinpoin.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>Kode Pos</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='Example123'
          />
          <Image
            source={require('../assets/icons/ic_pinpoin.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>Point Of maps</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='Jl.dewi sartika.'
          />
          <Image
            source={require('../assets/icons/ic_pinpoin.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>Email*</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='stevesmithexaple@gmail.com'
          />
          <Image
            source={require('../assets/icons/email.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.textTitle}>No. Telepon</Text>
        <View style={styles.viewTextInput}>
          <TextInput
            autoFocus={true}
            style={styles.textField}
            editable={false}
            value='+62*****'
          />
          <Image
            source={require('../assets/icons/email.png')}
            style={styles.iconText}
            resizeMode="contain"
          />
        </View>
      </View>
        <Button
          _theme="pink"
          onPress={() => console.log('SIMPAN DETAIL')}
          title="SIMPAN DETAIL"
          styleWrapper={styles.buttonSubmit}
        />
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  viewBg: {
    alignItems: 'flex-end',
  },
  viewImg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIcon: {
    margin: 4,
    height: 30,
    width: 30,
  },
  buttonUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    backgroundColor: theme.colors.grey7,
    borderRadius: 5,
    margin: 5,
  },
  imgBg: {
    alignItems: 'flex-end',
    height: 554 / 5,
    width: 606 / 5,
  },
  viewBorderCard: {
    justifyContent: 'center',
  },
  img: {
    height: 110,
    width: 110,
    borderRadius: 60,
    backgroundColor: theme.colors.grey5,
    margin: 10,
  },
  textProfile: {
    color: theme.colors.black,
    fontSize: 30,
    fontFamily: theme.Text.style.fontFamily,
    padding: 10,
  },
  textNormal: {
    color: theme.colors.black,
    fontSize: 18,
    fontFamily: theme.Text.style.fontFamily,
  },
  textGrey: {
    color: theme.colors.grey4,
    fontSize: 16,
    fontFamily: theme.Text.style.fontFamily,
  },
  viewBody: {
    margin: 10,
  },
  textTitle: {
    color: theme.colors.black,
    fontSize: 17,
    fontWeight: '500',
    marginTop: 25,
    marginBottom: 8,
  },
  viewTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.grey7,
    borderRadius: 13,
    paddingHorizontal: 12,
  },
  textField: {
    fontSize: 17,
    width: '90%',
  },
  iconText: {
    height: 20,
    width: 20,
  },
  viewBornDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewHalf: {
    width: '48%',
  },
  buttonSubmit: {
    width: '90%',
    alignSelf: 'center',
    // bottom: 10,
    // right: 0,
    margin: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
});
