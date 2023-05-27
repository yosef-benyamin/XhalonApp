import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
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

type ITabKeys = 'semua' | 'diskon' | 'pesan_lagi';

interface ITabs {
  title: string;
  keys: ITabKeys;
}

const CartListScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<ITabKeys>('semua');

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
          <Text> Jln. sma 14 ....</Text>
        </View>
        <View style={styles.lineHorizontal} />

        <Text style={[h1, {fontSize: 15}]}>Salon Jhoni</Text>

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
            <Image source={img_hair} style={{width: 165, height: 109}} />

            <View style={{marginLeft: 10}}>
              <Text style={[h1, {fontSize: 20}]}>Catok</Text>
              <Text style={[h3, {fontSize: 15, marginVertical: 15}]}>
                Kategori catok
              </Text>
              <Text style={[h3, {fontSize: 15, color: theme.colors.pink}]}>
                {currencyFormat(50000)}
              </Text>
            </View>
          </View>

          <Text>x1</Text>
        </View>

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
          <Text style={[h4, {fontSize: 11}]}>
            Silahkan masukkan kode voucher
          </Text>
        </View>

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
          <Text>Minggu, 26 Maret 2023</Text>
        </View>
        <View
          style={[
            rowCenter,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text>Jam Booking</Text>
          <Text>15:00</Text>
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Pilihan Trapies</Text>
          <Text>Abdul</Text>
        </View>

        <View style={styles.lineHorizontal} />

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Pesan</Text>
          <Text>Silahkan Ketik Pesan ...</Text>
        </View>

        <View style={styles.lineHorizontal} />
        <Text style={[h1]}>Metode Pemesanan</Text>
        <View style={styles.lineHorizontal} />

        <TouchableOpacity style={styles.btnPink}>
          <Text>Datang Ke Salon</Text>
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
          <Text style={[h4, {fontSize: 11}]}>
            Silahkan masukkan kode voucher
          </Text>
        </View>
        <View style={styles.lineHorizontal} />

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <View style={rowCenter}>
            <Image
              source={ic_database}
              style={{height: 17, width: 29}}
              resizeMode={'contain'}
            />
            <Text style={h3}> Point Tidak Dapat Ditukarkan</Text>
          </View>
          {/* <Text style={[h4, {fontSize: 11}]}>
            Silahkan masukkan kode voucher
          </Text> */}
        </View>

        <View style={styles.lineHorizontal} />

        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
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
        </View>

        <View style={styles.lineHorizontal} />

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
          <Text>{currencyFormat(50000)}</Text>
        </View>
        <View
          style={[
            rowCenter,
            {justifyContent: 'space-between', marginVertical: 10},
          ]}>
          <Text>Diskon</Text>
          <Text>{currencyFormat(50000)}</Text>
        </View>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <Text>Biaya Layanan</Text>
          <Text>{currencyFormat(50000)}</Text>
        </View>
        <View
          style={[rowCenter, {justifyContent: 'space-between', marginTop: 10}]}>
          <Text style={[h3, {fontSize: 16}]}>Total Pembayaran</Text>
          <Text style={{color: theme.colors.pink}}>
            {currencyFormat(50000)}
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
            {currencyFormat(31000)}
          </Text>
        </View>
        <Button
          title="bayar sekarang"
          _theme="pink"
          onPress={() => {navigation.navigate('PaymentSuccess')}}
          styleWrapper={{width: '50%'}}
        />
      </View>
    </View>
  );
};

export default CartListScreen;

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
