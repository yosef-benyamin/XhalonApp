import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
  const [jam, setJam] = useState('');
  const [tanggal, setTanggal] = useState(
    moment(new Date()).format('YYYY-MM-DD').toString(),
  );
  const [bookingType, setBookingType] = useState<'TO HOME' | 'TO SALON'>(
    'TO SALON',
  );

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: (
          <TouchableOpacity
            style={[
              rowCenter,
              {
                justifyContent: 'space-between',
                backgroundColor: theme.colors.pink,
                padding: 16,
                width: WINDOW_WIDTH,
                paddingVertical: 30,
                borderBottomEndRadius: 50,
                borderBottomLeftRadius: 50,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <Image
              source={ic_arrow_left_black}
              style={{
                height: 25,
                width: 25,
                // marginLeft: 16,
                tintColor:'#fff'
              }}
            />
            <Text style={[h1, {color: '#fff', marginLeft: 10, fontSize: 17}]}>
              Booking Pesanan
            </Text>
            <View style={{width: 40}} />
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const generateDateRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const [dateRange, setDateRange] = useState([]);
  const [monthRange, setMonthRange] = useState<
    {date: string; month: string; year: string}[]
  >([]);
  // Generate the date range from '2023-01-01' to '2023-12-31'

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date('2024-12-31');
    let _dateRange = generateDateRange(startDate, endDate);
    // console.log('_dateRange = ', _dateRange)
    setDateRange(_dateRange);

    const monthlyData = {};

    _dateRange.forEach(date => {
      const [year, month] = date.split('-');
      const key = `${month}-${year}`;

      if (!monthlyData[key]) {
        monthlyData[key] = [];
      }

      monthlyData[key].push(date);
    });

    // Convert the monthly data to an array of objects
    const monthlyDataArray = Object.entries(monthlyData).map(
      ([key, dates]) => ({
        month: key.split('-')[0],
        year: key.split('-')[1],
        date: dates[0], // Take the first date of the month
      }),
    );
    setMonthRange(monthlyDataArray);
    // console.log('monthlyDataArray = ', monthlyDataArray);

    return () => {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
      <ScrollView>
        {/* {dateRange.map((date, index) => (
        <Text key={index}>{date}</Text>
      ))} */}

        {/* <Text
          style={[h1, {textAlign: 'center', fontSize: 24, marginVertical: 5}]}>
          Pilih Jadwal Pesanan
        </Text> */}

        <ReactNativeModernDatepicker
          options={{
            backgroundColor: theme.colors.pink,
            textSecondaryColor: theme.colors.white,
            textDefaultColor: theme.colors.white,
            selectedTextColor: theme.colors.pink,
            textHeaderColor: theme.colors.white,
            borderColor: theme.colors.grey6,
            mainColor: theme.colors.white,
          }}
          locale="ID"
          mode="calendar"
          minimumDate={moment(new Date()).format('YYYY-MM-DD').toString()}
          selected={moment(new Date()).format('YYYY-MM-DD').toString()}
          style={{
            width: WINDOW_WIDTH - 50,
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: 30
          }}
          onDateChange={x => {
            console.log('selected date = ', x);
            setTanggal(x);
          }}
        />

        <Text style={[h1, {marginVertical: 10, fontSize: 15}]}>
          Jam Tersedia
        </Text>

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h3, {width: '15%', fontSize: 15}]}>Pagi</Text>

          {['10:00', '11:00', '11:30'].map((x, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.boxText,
                {
                  backgroundColor: jam === x ? theme.colors.pink : '#fff',
                  borderWidth: 1,
                  borderColor:
                    jam === x ? theme.colors.low_pink : theme.colors.grey6,
                },
              ]}
              onPress={() => setJam(x)}>
              <Text
                style={[
                  h1,
                  {
                    color: jam === x ? theme.colors.white : theme.colors.grey0,
                  },
                ]}>
                {x}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            rowCenter,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text style={[h3, {width: '15%', fontSize: 15}]}>Siang</Text>

          {['12:00', '13:00', '14:00'].map((x, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.boxText,
                {
                  backgroundColor: jam === x ? theme.colors.pink : '#fff',
                  borderWidth: 1,
                  borderColor:
                    jam === x ? theme.colors.low_pink : theme.colors.grey6,
                },
              ]}
              onPress={() => setJam(x)}>
              <Text
                style={[
                  h1,
                  {
                    color: jam === x ? theme.colors.white : theme.colors.grey0,
                  },
                ]}>
                {x}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text style={[h3, {width: '15%', fontSize: 15}]}>Sore</Text>

          {['17:00', '17:30', '18:00'].map((x, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.boxText,
                {
                  backgroundColor: jam === x ? theme.colors.pink : '#fff',
                  borderWidth: 1,
                  borderColor:
                    jam === x ? theme.colors.low_pink : theme.colors.grey6,
                },
              ]}
              onPress={() => setJam(x)}>
              <Text
                style={[
                  h1,
                  {
                    color: jam === x ? theme.colors.white : theme.colors.grey0,
                  },
                ]}>
                {x}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* <Text style={[h1, {marginVertical: 10, marginTop: 20}]}>Terapis</Text>

        <View>
          <ScrollView horizontal>
            {[...Array(10).fill(0)].map((x, i) => (
              <View style={{marginRight: 10}} key={i}>
                <Image source={img_barber} style={iconCustomSize(100)} />
                <Text>Name here</Text>
              </View>
            ))}
          </ScrollView>
        </View> */}

        <View
          style={[rowCenter, {justifyContent: 'space-between', marginTop: 20}]}>
          <TouchableOpacity
            style={
              bookingType !== 'TO SALON'
                ? styles.activeButton
                : styles.inactiveButton
            }
            onPress={() => setBookingType('TO SALON')}>
            <Text
              style={[
                h1,
                bookingType !== 'TO SALON'
                  ? {color: theme.colors.grey0}
                  : {color: '#fff'},
              ]}>
              Datang Ke Salon
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              bookingType !== 'TO HOME'
                ? styles.activeButton
                : styles.inactiveButton
            }
            onPress={() => setBookingType('TO HOME')}>
            <Text
              style={[
                h1,
                bookingType !== 'TO HOME'
                  ? {color: theme.colors.grey0}
                  : {color: '#fff'},
              ]}>
              Booking Ke Rumah
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          _theme="pink"
          disabled={!tanggal || !jam || !bookingType}
          title="Lanjutkan"
          onPress={() => {
            console.log('tanggal = ', tanggal);

            navigation.navigate('FormBookingOrder', {
              BOOKING_DATE: tanggal.toString().replace(/\//g, '-') + ' ' + jam,
              BOOKING_TYPE: bookingType,
            });
          }}
          styleWrapper={{
            marginTop: 20,
          }}
        />
      </ScrollView>
    </View>
  );
};

const SCREEN_WIDTH = Dimensions.get('screen').width - 20;

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  boxText: {
    paddingHorizontal: WINDOW_WIDTH / 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  activeButton: {
    // elevation: 4,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grey6,
  },
  inactiveButton: {
    // elevation: 4,
    backgroundColor: theme.colors.pink,
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
});
