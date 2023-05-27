import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  ic_barber,
  ic_calendar,
  ic_close,
  ic_ellipse,
  ic_ellipse_2,
  ic_ellipse_3,
} from 'assets/icons';
import {iconSize, WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h3, h5} from 'utils/styles';
import {theme} from 'utils';
import countryCodes from 'utils/country-codes.json';
import DropdownFlag from 'components/Dropdown/Dropdown';
import {FONT_SIZE_12} from 'utils/typography';
import CustomTextInput from 'components/TextInput';
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
import { Picker } from '@react-native-picker/picker';

const OtpVerificationScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)
  const [sex, setSex] = useState('pria');
  const [form, setForm] = useState({
    phone: '',
    nama_lengkap: '',
    code: '',
  });
  const [selected, setSelected] = useState(countryCodes[0]);

  return (
    <View style={{flex: 1}}>
      <View>
        <Image source={ic_close} style={styles.icClose} />
        <Image source={ic_ellipse_2} style={styles.icEllipse} />
      </View>

      <ScrollView>
        <View
          style={{
            marginTop: 100,
            marginHorizontal: 16,
          }}>
          <Text style={[h1, styles.textXhalon]}>Informasi Dasar</Text>

          <CustomTextInput
            placeholder="Nama Lengkap"
            title="Nama Lengkap"
            onChangeText={v => {
              setForm({...form, nama_lengkap: v});
              // setFormError({...formError, [`error_phone`]: ''});
            }}
            value={form.phone}
            errorMessage={''}
          />

          <Text style={[styles.title, h1]}>Tanggal Lahir</Text>
          <TouchableOpacity
            onPress={()=> setModalVisible(!modalVisible)}
            style={[
              {
                // justifyContent: 'space-between',
                flexDirection: 'row',
                borderWidth: 0.8,
                marginTop: 10,
                borderColor: theme.colors.grey3,
                borderRadius: 5,
                padding: 10
              },
            ]}>
            <Image source={ic_calendar} style={iconSize} />
            <Text>25 Maret 2022</Text>
          </TouchableOpacity>

          <Text style={[styles.title, h1]}>Jenis Kelamin</Text>
          
          <Picker
            selectedValue={sex}
            onValueChange={(itemValue, itemIndex) =>
              setSex(itemValue)
            }>
            <Picker.Item label="Pria" value="pria" />
            <Picker.Item label="Wanita" value="wanita" />
          </Picker>
          <Button
            _theme="pink"
            title="Simpan & Lanjutkan"
            onPress={() => {
              navigation.navigate('MainTab');
            }}
            styleWrapper={{
              marginTop: 20,
            }}
          />
        </View>
      </ScrollView>
      <CustomDatePicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {/* <Image source={ic_ellipse_3} style={styles.icEllipse3} /> */}
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  icEllipse: {
    position: 'absolute',
    top: 0,
    // left: 0,
    right: -WINDOW_WIDTH / 2.5,
    height: WINDOW_HEIGHT / 6,
    width: WINDOW_WIDTH,
    resizeMode: 'contain',
  },
  icEllipse3: {
    position: 'absolute',
    bottom: 0,
    // left: 0,
    // right: 0,
    height: WINDOW_HEIGHT / 4,
    width: WINDOW_WIDTH,
    resizeMode: 'stretch',
  },
  icClose: {
    position: 'absolute',
    top: 40,
    left: 20,
    // right: 0,
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textXhalon: {fontSize: 40, color: theme.colors.grey1},
  title: {
    fontSize: FONT_SIZE_12,
    marginTop: 20,
  },
  inputContainerStyles: {
    backgroundColor: theme.colors.grey6,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  otpStyles: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
