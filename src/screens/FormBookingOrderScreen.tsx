import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ic_arrow_left_black, ic_check} from 'assets/icons';
import {
  iconCustomSize,
  iconSize,
  rowCenter,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
import {h1, h2, h3, h5} from 'utils/styles';

import Button from 'components/Button';
// import OtpInputs from 'react-native-otp-inputs';
import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
// import DatePicker from 'react-native-modern-datepicker';
import ReactNativeModernDatepicker, {
  getToday,
} from 'react-native-modern-datepicker';
import moment from 'moment';
import CustomDatePicker from 'components/DatePicker';
import {Picker} from '@react-native-picker/picker';
import appBar from 'components/AppBar/AppBar';
import {img_barber} from 'assets/images';
import CustomTextInput from 'components/TextInput';

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(0);
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
              Booking Pesanan
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        <Text
          style={[h1, {textAlign: 'center', fontSize: 24, marginVertical: 5}]}>
          Pilih Alamat Pesanan
        </Text>

        <CustomTextInput
          title="Nama Lengkap"
          placeholder="Nama Lengkap"
          errorMessage=""
          onChangeText={() => {}}
          value={''}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Alamat"
          placeholder="Alamat"
          errorMessage=""
          onChangeText={() => {}}
          value={''}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kelurahan"
          placeholder="Kelurahan"
          errorMessage=""
          onChangeText={() => {}}
          value={''}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kecamatan"
          placeholder="Kecamatan"
          errorMessage=""
          onChangeText={() => {}}
          value={''}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kota"
          placeholder="Kota"
          errorMessage=""
          onChangeText={() => {}}
          value={''}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kode Pos"
          placeholder="Kode Pos"
          errorMessage=""
          onChangeText={() => {}}
          value={''}
        />
        <View style={{marginBottom: 10}} />

        <View style={[rowCenter, {alignSelf: 'flex-end'}]}>
          <Text>Simpan alamat ini{' '}</Text>
          <Image source={ic_check} style={iconSize} />
        </View>

        <Button
          _theme="pink"
          title="Lanjutkan"
          onPress={() => {navigation.navigate('Checkout')}}
          styleWrapper={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  boxText: {paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#fff'},
  activeButton: {
    elevation: 4,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  inactiveButton: {
    elevation: 4,
    backgroundColor: '#C0226D',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
});
