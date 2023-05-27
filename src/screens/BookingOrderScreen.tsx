import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ic_arrow_left_black,
  ic_barber,
  ic_calendar,
  ic_close,
  ic_ellipse,
  ic_ellipse_2,
  ic_ellipse_3,
} from 'assets/icons';
import {
  iconCustomSize,
  iconSize,
  rowCenter,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from 'utils/mixins';
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
import {Picker} from '@react-native-picker/picker';
import appBar from 'components/AppBar/AppBar';
import {img_barber} from 'assets/images';

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
          Pilih Jadwal Pesanan
        </Text>

        <ReactNativeModernDatepicker
          options={{
            backgroundColor: '#C0226D',
            textSecondaryColor: '#fff',
            textDefaultColor: '#fff',
            selectedTextColor: '#fff',
          }}
          style={{
            width: WINDOW_WIDTH-50,
            alignSelf: 'center',
            borderRadius: 10
          }}
        />

        <Text style={[h1, {marginVertical: 10}]}>Jam Tersedia</Text>

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={{width: '10%'}}>Pagi</Text>
          <Text style={styles.boxText}>10:00 AM</Text>
          <Text style={styles.boxText}>11:00 AM</Text>
          <Text style={styles.boxText}>11:30 AM</Text>
        </View>
        <View
          style={[
            rowCenter,
            {justifyContent: 'space-between', marginVertical: 20},
          ]}>
          <Text style={{width: '10%'}}>Siang</Text>
          <Text style={styles.boxText}>10:00 AM</Text>
          <Text style={styles.boxText}>11:00 AM</Text>
          <Text style={styles.boxText}>11:30 AM</Text>
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={{width: '10%'}}>Sore</Text>
          <Text style={styles.boxText}>10:00 AM</Text>
          <Text style={styles.boxText}>11:00 AM</Text>
          <Text style={styles.boxText}>11:30 AM</Text>
        </View>

        <Text style={[h1, {marginVertical: 10, marginTop: 20}]}>Terapis</Text>

        <View>
          <ScrollView horizontal>
            {[...Array(10).fill(0)].map((x, i) => (
              <View style={{marginRight: 10}} key={i}>
                <Image source={img_barber} style={iconCustomSize(100)} />
                <Text>Name here</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={[rowCenter, {justifyContent: 'space-between', marginTop: 20}]}>
          <TouchableOpacity style={selectedBtn !== 0 ? styles.activeButton : styles.inactiveButton} onPress={()=>setSelectedBtn(0)}>
            <Text style={selectedBtn !== 0 ? {color: '#000'} : {color: '#fff'}}>Datang Ke Salon</Text>
          </TouchableOpacity>

          <TouchableOpacity style={selectedBtn !== 1 ? styles.activeButton : styles.inactiveButton} onPress={()=>setSelectedBtn(1)}>
            <Text style={selectedBtn !== 1 ? {color: '#000'} : {color: '#fff'}}>Booking Ke Rumah</Text>
          </TouchableOpacity>
        </View>

        <Button
          _theme='pink'
          title='Lanjutkan'
          onPress={()=> {navigation.navigate('FormBookingOrder')}}
          styleWrapper={{
            marginTop: 20
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
    alignItems: 'center'
  },
  inactiveButton: {
    elevation: 4,
    backgroundColor: '#C0226D',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center'
  }
});
