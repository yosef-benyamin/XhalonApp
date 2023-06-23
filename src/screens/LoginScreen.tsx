import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ic_barber, ic_ellipse} from 'assets/icons';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h3, h5} from 'utils/styles';
import {theme} from 'utils';
import countryCodes from 'utils/country-codes.json';
import DropdownFlag from 'components/Dropdown/Dropdown';
import {FONT_SIZE_12} from 'utils/typography';
import CustomTextInput from 'components/TextInput';
import Button from 'components/Button';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from 'store/actions/AuthStore';
import Loading from 'components/Loading';
import {AuthState} from 'types/auth.types';

const LoginScreen = () => {
  const navigation = useNavigation();
  const login = useAuthStore((state: AuthState) => state.login);
  const [loader, setLoader] = useState(false);

  const [form, setForm] = useState({
    phone: '085641231746',
    password: 'MAKINMUDAH',
    code: '',
  });
  const [selected, setSelected] = useState(countryCodes[0]);

  const handleLogin = async () => {
    if (!form.phone || !form.password) {
      Alert.alert('Peringatan', 'Semua Field harus diisi');
      return;
    }
    setLoader(true);
    await login(form.phone, form.password);
    setLoader(false);
  };

  if (loader) return <Loading />;
  return (
    <View style={{flex: 1}}>
      <View>
        <Image source={ic_ellipse} style={styles.icEllipse} />
        <Image source={ic_barber} style={styles.icBarber} />
      </View>

      <ScrollView>
        <View
          style={{
            marginTop: WINDOW_HEIGHT / 2.2,
            marginHorizontal: 16,
          }}>
          <Text style={[h1, styles.textXhalon]}>Xhalon</Text>

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
                  setForm({...form, code: v.dial_code});
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
                  setForm({...form, phone: v});
                  // setFormError({...formError, [`error_phone`]: ''});
                }}
                value={form.phone}
                errorMessage={''}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <View style={{marginTop: 12}} />
          <CustomTextInput
            placeholder="Masukan password anda"
            title="Password"
            onChangeText={v => {
              setForm({...form, password: v});
              // setFormError({...formError, [`error_phone`]: ''});
            }}
            value={form.password}
            errorMessage={''}
          />
          <Text style={[h5, {alignSelf: 'flex-end', marginTop: 5}]}>
            Lupa Password?
          </Text>

          <Button
            _theme="pink"
            title="MASUK"
            onPress={handleLogin}
            styleWrapper={{
              marginTop: 20,
            }}
          />

          <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text
              style={[
                h2,
                {
                  alignSelf: 'center',
                  color: theme.colors.grey3,
                  marginTop: 10,
                },
              ]}>
              belum punya akun? <Text style={{color: '#000'}}>Daftar baru</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  icEllipse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: WINDOW_HEIGHT / 3,
    width: WINDOW_WIDTH,
  },
  icBarber: {
    position: 'absolute',
    top: WINDOW_HEIGHT / 7,
    // left: 0,
    // right: 0,
    alignSelf: 'center',
    height: WINDOW_HEIGHT / 4,
    width: WINDOW_WIDTH / 1,
    resizeMode: 'contain',
  },
  textXhalon: {alignSelf: 'center', fontSize: 40, color: theme.colors.grey1},
  title: {
    fontSize: FONT_SIZE_12,
    marginTop: 20,
  },
});
