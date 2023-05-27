import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ic_barber, ic_close, ic_ellipse, ic_ellipse_2} from 'assets/icons';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h3, h5} from 'utils/styles';
import {theme} from 'utils';
import countryCodes from 'utils/country-codes.json';
import DropdownFlag from 'components/Dropdown/Dropdown';
import {FONT_SIZE_12} from 'utils/typography';
import CustomTextInput from 'components/TextInput';
import Button from 'components/Button';
import OtpInputs from 'react-native-otp-inputs';
import {useNavigation} from '@react-navigation/native';
import {register} from 'store/effects/AuthStore';
import Loading from 'components/Loading';

interface Form {
  FULL_NAME: string;
  TELP_NO: string;
  PASSWORD: string;
  RE_PASSWORD: string;
  REFERRAL_CODE?: string;
}
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState<Form>({
    FULL_NAME: '',
    TELP_NO: '',
    PASSWORD: '',
    RE_PASSWORD: '',
    REFERRAL_CODE: '',
  });

  const [selected, setSelected] = useState(countryCodes[0]);

  const handleRegister = async () => {
    let status = true;
    Object.keys(form)?.map((x, i) => {
      if (!form[x] && x !== 'REFERRAL_CODE') {
        status = false;
      }
    });
    if (!status) {
      Alert.alert('Peringatan', 'Semua form harus diisi');
      return;
    }

    try {
      setLoader(true)
      let response = await register(form);
      setLoader(false)

      console.log('res =- ', response);
      if (response?.rs?.[0]?.RESULT_CODE === '01') {
        navigation.navigate('OtpVerification', {
          TELP_NO: form?.TELP_NO,
          NO_TRX: response?.rs?.[0]?.NO_TRX
        });

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
          <Text style={[h1, styles.textXhalon]}>Daftar Akun</Text>

          <View style={{marginTop: 12}} />
          <CustomTextInput
            placeholder="masukkan nama lengkap anda"
            title="nama lengkap"
            onChangeText={v => {
              setForm({...form, FULL_NAME: v});
              // setFormError({...formError, [`error_phone`]: ''});
            }}
            value={form.FULL_NAME}
            errorMessage={''}
          />

          <Text style={[styles.title, h1]}>No. Handphone*</Text>
          <View
            style={[
              {
                justifyContent: 'space-between',
                flexDirection: 'row',
                height: 60,
              },
            ]}>
            <View style={{width: '30%', marginTop: 10}}>
              <DropdownFlag
                data={countryCodes}
                label=""
                onSelect={(v: any) => {
                  setForm({...form, code: v?.dial_code!});
                  setSelected(v);
                }}
                selected={selected}
              />
            </View>
            <View style={{width: '65%'}}>
              <CustomTextInput
                placeholder="Masukan No. Handphone anda"
                // title="Email"
                onChangeText={v => {
                  setForm({...form, TELP_NO: v});
                  // setFormError({...formError, [`error_phone`]: ''});
                }}
                value={form.TELP_NO}
                errorMessage={''}
              />
            </View>
          </View>
          <View style={{marginTop: 12}} />
          <CustomTextInput
            placeholder="masukkan password dengan benar"
            title="Password"
            onChangeText={v => {
              setForm({...form, PASSWORD: v});
              // setFormError({...formError, [`error_phone`]: ''});
            }}
            value={form.PASSWORD}
            errorMessage={''}
          />
          <View style={{marginTop: 12}} />
          <CustomTextInput
            placeholder="masukkan password dengan benar"
            title="Konfirmasi Password"
            onChangeText={v => {
              setForm({...form, RE_PASSWORD: v});
              // setFormError({...formError, [`error_phone`]: ''});
            }}
            value={form.RE_PASSWORD}
            errorMessage={''}
          />

          <View style={{marginTop: 12}} />

          <Text style={[h1]}>Kode Referal (optional)</Text>
          <OtpInputs
            handleChange={code => setForm({...form, REFERRAL_CODE: code})}
            numberOfInputs={6}
            // autofillFromClipboard
            autofillFromClipboard
            style={styles.otpStyles}
            inputContainerStyles={styles.inputContainerStyles}
          />

          <Button
            _theme="pink"
            title="DAFTAR"
            onPress={() => {
              // navigation.navigate('OtpVerification');
              handleRegister();
            }}
            styleWrapper={{
              marginTop: 20,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

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
