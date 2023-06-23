import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter, WINDOW_HEIGHT} from 'utils/mixins';
import {
  ic_arrow_left_black,
  ic_arrow_left_white,
  ic_chat,
  ic_coin,
  ic_database,
  ic_doc,
  ic_pinpoin,
  ic_voucher,
} from 'assets/icons';
import {h1, h2, h3, h4} from 'utils/styles';
import {theme} from 'utils';
import AllCart from 'components/CartListComponents/AllCart';
import {img_hair} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import Button from 'components/Button';
import {CartState} from 'types/cart.types';
import {useCartStore} from 'store/actions/cartStore';
import {useProductStore} from 'store/actions/ProductStore';
import {BASE_URL} from '@env';
import moment from 'moment';
import useEffectSkipInitialRender from 'utils/useEffectSkipInitialRender';
import Loading from 'components/Loading';

type ITabKeys = 'semua' | 'diskon' | 'pesan_lagi';

interface ITabs {
  title: string;
  keys: ITabKeys;
}

const CartListScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<ITabKeys>('semua');
  const cartStore: CartState = useCartStore();
  const store = useProductStore(state => state.store);
  const [note, setNote] = useState('');
  const [voucher, setVoucher] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const data = {
      FILTER_DAY: '',
      FILTER_MONTH: '',
      FILTER_YEAR: '',
      FILTER_FIELD: '',
      FILTER_VALUE: '',
      PAGE_NO: '1',
      PAGE_ROW: '20',
      SORT_ORDER_BY: 'SALES_DATE',
      SORT_ORDER_TYPE: 'DESC',
      TRANSACTION_ID: cartStore?.no_trx,
      STATUS_ID: '',
    };

    cartStore?.listOrder(data);
    return () => {};
  }, [navigation]);

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
            <Text style={[h1, {color: '#000', marginLeft: 10}]}>Checkout</Text>
          </TouchableOpacity>
        ),
        trailing: (
          <TouchableOpacity style={{marginRight: 16}}>
            <Image source={ic_chat} style={iconSize} />
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffectSkipInitialRender(() => {
    editData();
  }, [note]);

  const editData = async () => {
    const data = {
      SALES_ID: cartStore.no_trx,
      BOOKING_DATE: cartStore.list_order?.BOOKING_DATE,
      BOOKING_TYPE: cartStore.list_order?.BOOKING_TYPE,
      VOUCHER_CODE: cartStore.list_order?.VOUCHER_CODE,
      DELIVERYCOST_VAL: cartStore.list_order?.DELIVERYCOST_VAL,
      NOTE: note,
      COMPANY_ID: cartStore?.list_order?.COMPANY_ID,
    };
    await cartStore.editOrder(data);
    cartStore.listOrder({
      FILTER_DAY: '',
      FILTER_MONTH: '',
      FILTER_YEAR: '',
      FILTER_FIELD: '',
      FILTER_VALUE: '',
      PAGE_NO: '1',
      PAGE_ROW: '20',
      SORT_ORDER_BY: 'SALES_DATE',
      SORT_ORDER_TYPE: 'DESC',
      TRANSACTION_ID: cartStore?.no_trx,
      STATUS_ID: '',
    });
  };

  useEffectSkipInitialRender(() => {
    editData2();
  }, [voucher]);

  const editData2 = async () => {
    const data = {
      SALES_ID: cartStore.no_trx,
      BOOKING_DATE: cartStore.list_order?.BOOKING_DATE,
      BOOKING_TYPE: cartStore.list_order?.BOOKING_TYPE,
      VOUCHER_CODE: voucher,
      DELIVERYCOST_VAL: cartStore.list_order?.DELIVERYCOST_VAL,
      NOTE: cartStore.list_order?.NOTE,
      COMPANY_ID: cartStore?.list_order?.COMPANY_ID,
    };
    await cartStore.editOrder(data);
    cartStore.listOrder({
      FILTER_DAY: '',
      FILTER_MONTH: '',
      FILTER_YEAR: '',
      FILTER_FIELD: '',
      FILTER_VALUE: '',
      PAGE_NO: '1',
      PAGE_ROW: '20',
      SORT_ORDER_BY: 'SALES_DATE',
      SORT_ORDER_TYPE: 'DESC',
      TRANSACTION_ID: cartStore?.no_trx,
      STATUS_ID: '',
    });
  };

  const handleInputChange = async (text: string) => {
    // Lakukan sesuatu dengan nilai teks yang diubah
    console.log(text);
    setNote(text);
  };

  const handleInputChange2 = async (text: string) => {
    // Lakukan sesuatu dengan nilai teks yang diubah
    console.log(text);
    setVoucher(text);
  };


  if(loader) {
    return (
      <Loading/>
    )
  }

  return (
    <View style={{flex: 1, padding: 16}}>
      <ScrollView>
        <Text>Alamat Salon Yang Di Pesan</Text>
        <View
          style={[
            rowCenter,
            {
              height: WINDOW_HEIGHT / 7,
              alignItems: 'flex-start',
              marginTop: 10,
            },
          ]}>
          <Image source={ic_pinpoin} style={iconSize} resizeMode={'contain'} />
          <Text> {cartStore?.list_order?.ORDER_ADDRESS}</Text>
        </View>
        <View style={styles.lineHorizontal} />

        <Text style={[h1, {fontSize: 15}]}>
          {
            store?.find(x => x.COMPANY_ID === cartStore?.cart?.COMPANY_ID)
              ?.COMPANY_NAME
          }
        </Text>

        {cartStore?.cart?.ITEMS?.filter(x => x?.IS_SELECTED)?.map((x, i) => (
          <View
            style={[
              rowCenter,
              {
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: 10,
              },
            ]}>
            <View style={rowCenter}>
              <Image
                source={{uri: BASE_URL + '/' + x?.MAIN_IMAGE}}
                style={{width: 165, height: 109}}
              />

              <View style={{marginLeft: 10}}>
                <Text style={[h1, {fontSize: 20}]}>Catok</Text>
                <Text style={[h3, {fontSize: 15, marginVertical: 15}]}>
                  Kategori {x?.KET_ANALISA_GLOBAL}
                </Text>
                <Text style={[h3, {fontSize: 15, color: theme.colors.pink}]}>
                  {currencyFormat(x?.UNIT_PRICE)}
                </Text>
              </View>
            </View>

            <Text>x{x.QTY}</Text>
          </View>
        ))}

        <View style={styles.lineHorizontal} />

        {/* <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image
              source={ic_voucher}
              style={{height: 17, width: 29}}
              resizeMode={'contain'}
            />
            <Text style={h3}> Voucher Salon</Text>
          </View>
          <Text style={[h4, {fontSize: 11}]}>
            Silahkan masukkan kode voucher
          </Text>
        </View> */}

        <View style={styles.lineHorizontal} />

        <View style={[rowCenter, {marginBottom: 10}]}>
          <Image
            source={ic_doc}
            style={{height: 17, width: 29}}
            resizeMode={'contain'}
          />
          <Text> Rincian Jadwal</Text>
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Tanggal</Text>
          <Text>
            {moment(cartStore?.list_order?.BOOKING_DATE).format(
              'dddd, DD MMMM YYYY',
            )}
          </Text>
        </View>
        <View
          style={[
            rowCenter,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text>Jam Booking</Text>
          <Text>
            {moment(cartStore?.list_order?.BOOKING_DATE).format('HH:mm')}
          </Text>
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Pilihan Trapies</Text>
          <Text>Abdul</Text>
        </View>

        <View style={styles.lineHorizontal} />

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Pesan</Text>
          {/* <Text>Silahkan Ketik Pesan ...</Text> */}
          <DebouncedTextInput
            onChange={handleInputChange}
            debounceTime={1500}
            placeholder={'silahkan ketik pesan...'}
          />
        </View>

        <View style={styles.lineHorizontal} />
        <Text style={[h1]}>Metode Pemesanan</Text>
        <View style={styles.lineHorizontal} />

        <TouchableOpacity style={styles.btnPink}>
          <Text>{cartStore.list_order?.BOOKING_TYPE}</Text>
        </TouchableOpacity>

        <View style={styles.lineHorizontal} />

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image
              source={ic_voucher}
              style={{height: 17, width: 29}}
              resizeMode={'contain'}
            />
            <Text style={h3}> Voucher Salon</Text>
          </View>
          <DebouncedTextInput
            onChange={handleInputChange2}
            debounceTime={1500}
            placeholder={'silahkan ketik voucher...'}
          />
        </View>
        {/* <View style={styles.lineHorizontal} /> */}

        {/* <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image
              source={ic_database}
              style={{height: 17, width: 29}}
              resizeMode={'contain'}
            />
            <Text style={h3}> Point Tidak Dapat Ditukarkan</Text>
          </View>
        </View> */}

        <View style={styles.lineHorizontal} />

        {/* <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image
              source={ic_coin}
              style={{height: 17, width: 29}}
              resizeMode={'contain'}
            />
            <Text style={h3}> Metode Pembayaran</Text>
          </View>
          <Text style={[h4, {fontSize: 11}]}>
            Silahkan Pilih Metode Pembayaran
          </Text>
        </View> */}

        {/* <View style={styles.lineHorizontal} /> */}

        <View style={[rowCenter, {marginBottom: 10}]}>
          <Image
            source={ic_doc}
            style={{height: 17, width: 29}}
            resizeMode={'contain'}
          />
          <Text> Rincian Pembayaran</Text>
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>SubTotal Untuk Produk</Text>
          <Text>{currencyFormat(cartStore.list_order?.BRUTO_VAL)}</Text>
        </View>
        <View
          style={[
            rowCenter,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text>Diskon</Text>
          <Text>{currencyFormat(cartStore.list_order?.DISC_VAL)}</Text>
        </View>
        {/* <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Biaya Layanan</Text>
          <Text>{currencyFormat(9999)}</Text>
        </View> */}
        <View
          style={[rowCenter, {justifyContent: 'space-between', marginTop: 10}]}>
          <Text style={[h3, {fontSize: 16}]}>Total Pembayaran</Text>
          <Text style={{color: theme.colors.pink}}>
            {currencyFormat(cartStore.list_order?.NETTO_VAL)}
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}>
        <View style={{alignItems: 'flex-end', marginRight: 10}}>
          <Text>Total Pembayaran</Text>
          <Text style={{color: theme.colors.pink, fontWeight: '700'}}>
            {currencyFormat(cartStore.list_order?.NETTO_VAL)}
          </Text>
        </View>
        <Button
          title="bayar sekarang"
          _theme="pink"
          onPress={async () => {
            const data = {
              SALES_ID: cartStore?.no_trx,
            };
            let resSubmit: any = await cartStore?.submitOrder(data);
            if (resSubmit === 200) {
              const dataPayment = {
                SALES_ID: cartStore?.no_trx,
                SETTLE_PAYMENT_METHOD: 'PAYMENT_GT',
                PAYMENT_BILL_VAL: '120000',
                // PAYMENT_BILL_VAL: cartStore.list_order?.PAYMENT_BILL_VAL,
              };
              setLoader(true);
              let resPayment: any = await cartStore?.paymentOrder(dataPayment);
              setLoader(false);
              try {
                Linking.openURL(resPayment?.redirect_url);
              } catch (error) {
                Alert.alert('PERINGATAN', 'Terjadi kesalahan, silahkan hubungi CS')
              }
            }

            navigation.navigate('PaymentSuccess');
          }}
          styleWrapper={{width: '50%'}}
        />
      </View>
    </View>
  );
};

export default CartListScreen;

const DebouncedTextInput = ({
  onChange,
  debounceTime,
  placeholder,
  ...restProps
}: any) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(text);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [text, onChange, debounceTime]);

  const handleChangeText = (inputText: string) => {
    setText(inputText);
  };

  return (
    <TextInput
      onChangeText={handleChangeText}
      value={text}
      {...restProps}
      placeholder={placeholder}
      maxLength={50}
      multiline
    />
  );
};

const styles = StyleSheet.create({
  lineHorizontal: {
    borderBottomColor: theme.colors.grey6,
    borderWidth: 0.5,
    marginVertical: 20,
  },
  btnPink: {
    backgroundColor: theme.colors.low_pink,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
});
