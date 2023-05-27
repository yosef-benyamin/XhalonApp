import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ic_barber, ic_close, ic_ellipse, ic_ellipse_2, ic_ellipse_3} from 'assets/icons';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h3, h5} from 'utils/styles';
import {theme} from 'utils';
import countryCodes from 'utils/country-codes.json';
import DropdownFlag from 'components/Dropdown/Dropdown';
import {FONT_SIZE_12} from 'utils/typography';
import CustomTextInput from 'components/TextInput';
import Button from 'components/Button';
// import OtpInputs from 'react-native-otp-inputs';
import { useNavigation } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import { register } from 'store/effects/AuthStore';
import Loading from 'components/Loading';

const OtpVerificationScreen = ({route}: any) => {
  const TELP_NO = route?.params?.TELP_NO;

  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);

  const handleRegisterOtp = async () => {
    let status = true;
    if(otp?.length < 6) status = false
    if (!status) {
      Alert.alert('Peringatan', 'OTP harus diisi');
      return;
    }

    try {
      setLoader(true)
      let response = await register({
        "ACTION_ID": "REGISTER_OTP",
        "TELP_NO": TELP_NO,
        "OTP_NO": otp
      });
      setLoader(false)

      console.log('res =- ', response);
      if (response?.rs?.[0]?.RESULT_CODE === '01') {
        Alert.alert('Sukses', 'Akun berhasil dibuat')
        navigation.navigate('Login');

    } else {
        Alert.alert('Peringatan', response?.rs?.[0]?.RESULT_MESSAGE || 'Akun yang anda buat sudah tedaftar');
        return response.data;
    }

      
    } catch (error) {
      console.log(error);
    }
  };

  if(loader) return <Loading/>

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
          <Text style={[h1, styles.textXhalon]}>Verifikasi</Text>

          <Text style={[h3, {color: theme.colors.grey3}]}>Masukkan OTP yang dikirim di +62******</Text>

          <View style={{marginTop: 12}} />
          
          <OtpInputs
            handleChange={code => setOtp(code)}
            numberOfInputs={6}
            autofillFromClipboard={false}
            style={styles.otpStyles}
            inputContainerStyles={styles.inputContainerStyles}
          />

          <Text style={[h3, {color: theme.colors.grey3, marginTop: 20}]}>Tidak menerima OTP? Kirim ulang</Text>

          <Button
            _theme="pink"
            title="Verifikasi & lanjutkan"
            onPress={handleRegisterOtp}
            styleWrapper={{
              marginTop: 20,
            }}
          />
        </View>
      </ScrollView>
      <Image source={ic_ellipse_3} style={styles.icEllipse3} />
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
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  otpStyles: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10
  }
});
