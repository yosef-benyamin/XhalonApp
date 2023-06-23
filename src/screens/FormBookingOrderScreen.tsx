import {
  Alert,
  Image,
  PermissionsAndroid,
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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
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
import {CartState} from 'types/cart.types';
import {useCartStore} from 'store/actions/cartStore';
import {RootStackParamList} from 'types/navigator';
import GetLocation from 'react-native-get-location';
import Loading from 'components/Loading';

type FormBookingOrderRouteProp = RouteProp<
  RootStackParamList,
  'FormBookingOrder'
>;

const FormBookingOrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<FormBookingOrderRouteProp>();

  const [loader, setLoader] = useState(false);
  const cartStore: CartState = useCartStore();

  const [form, setForm] = useState({
    name: '',
    address: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    kode_pos: '',
  });

  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    getLocation();
    return () => {};
  }, [navigation]);

  const getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'App Location Permission',
        message: 'App needs access to your location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          console.log(location);
          setLocation({
            latitude: location.latitude.toString(),
            longitude: location.longitude.toString(),
          });
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
      return;
    }
  };

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

  const handleAdd = async () => {
    let status = true;
    Object.keys(form).map((x, i) => {
      if (!form[x]) {
        status = false;
      }
    });
    if (!status) {
      Alert.alert('PERINGATAN', 'Silahkan isi semua form');
      return;
    }
    const data = {
      COMPANY_ID: cartStore.cart.COMPANY_ID,
      BOOKING_DATE: route.params?.BOOKING_DATE,
      BOOKING_TYPE: route.params?.BOOKING_TYPE,
      VOUCHER_CODE: '',
      DELIVERYCOST_VAL: '0',
      ORDER_ADDRESS: form?.address,
      ORDER_KELURAHAN_ID: form.kelurahan,
      ORDER_POINT: location.latitude + ',' + location.longitude,
      ORDER_DISTANCE: '12',
      NOTE: '',
      ITEMS: [...cartStore.cart?.ITEMS?.filter(x=> x?.IS_SELECTED)!],
    };
    setLoader(true)
    let res: any = await cartStore.addOrder(data);
    setLoader(false)
    console.log('res = ', res)
    if (res === 200) {
      navigation.navigate('Checkout');
    }
    // console.log('data = ', data);
  };

  if(loader) {
    return (
      <Loading/>
    )
  }
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
          onChangeText={v => {
            setForm({...form, name: v});
          }}
          value={form.name}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Alamat"
          placeholder="Alamat"
          errorMessage=""
          onChangeText={v => {
            setForm({...form, address: v});
          }}
          value={form.address}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kelurahan"
          placeholder="Kelurahan"
          errorMessage=""
          onChangeText={v => {
            setForm({...form, kelurahan: v});
          }}
          value={form.kelurahan}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kecamatan"
          placeholder="Kecamatan"
          errorMessage=""
          onChangeText={v => {
            setForm({...form, kecamatan: v});
          }}
          value={form.kecamatan}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kota"
          placeholder="Kota"
          errorMessage=""
          onChangeText={v => {
            setForm({...form, kota: v});
          }}
          value={form.kota}
        />
        <View style={{marginBottom: 10}} />
        <CustomTextInput
          title="Kode Pos"
          placeholder="Kode Pos"
          keyboardType='numeric'
          errorMessage=""
          onChangeText={v => {
            setForm({...form, kode_pos: v});
          }}
          value={form.kode_pos}
        />

        <View style={{marginBottom: 10}} />

        <View style={[rowCenter, {alignSelf: 'flex-end'}]}>
          <Text>Simpan alamat ini </Text>
          <Image source={ic_check} style={iconSize} />
        </View>

        <Button
          _theme="pink"
          disabled={(!form.name || !form.address || !form.kelurahan || !form.kecamatan || !form.kota || !form.kode_pos)}
          title="Lanjutkan"
          onPress={handleAdd}
          styleWrapper={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default FormBookingOrderScreen;

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
