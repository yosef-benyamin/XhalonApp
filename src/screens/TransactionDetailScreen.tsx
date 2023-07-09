import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter, WINDOW_HEIGHT} from 'utils/mixins';
import {ic_arrow_left_black} from 'assets/icons';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {theme} from 'utils';
import AllCart from 'components/CartListComponents/AllCart';
import {ic_beard, img_hair} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import Button from 'components/Button';
import {CartState} from 'types/cart.types';
import {useCartStore} from 'store/actions/cartStore';
import {useProductStore} from 'store/actions/ProductStore';
import {BASE_URL} from '@env';
import moment from 'moment';
import useEffectSkipInitialRender from 'utils/useEffectSkipInitialRender';
import Loading from 'components/Loading';
import {IHistory} from 'types/products.types';
import {
  getOrderStatus,
  listDetailTransaction,
} from 'store/effects/productStore';

type ITabKeys = 'semua' | 'diskon' | 'pesan_lagi';

interface ITabs {
  title: string;
  keys: ITabKeys;
}

const TransactionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const item: IHistory = route?.params?.item;
  const [detailTrx, setDetailTrx] = useState<IHistory[]>([]);

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
            <Text style={[h1, {color: '#000', marginLeft: 10, fontSize: 14}]}>
              Rincian Pesanan
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    getDetail();
    getDetailOrder();
    return () => {};
  }, [navigation]);

  const getDetail = async () => {
    const res = await listDetailTransaction(item?.SALES_ID);

    console.log('ress = ', res?.rs?.DATA);

    if (res?.rs?.RESULT_CODE === '01') {
      setDetailTrx(res?.rs?.DATA);
    }
  };

  const [detailOder, setDetailOder] = useState<any[]>([]);

  const getDetailOrder = async () => {
    const res = await getOrderStatus(item?.SALES_ID);

    console.log('ress22 = ', res?.rs);

    if (res?.rs?.RESULT_CODE === '01') {
      setDetailOder(res?.rs?.DATA);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={{padding: 16, backgroundColor: theme.colors.pink}}>
          <Text style={[h1, {color: '#fff', fontSize: 14}]}>
            {item?.STATUS_ID_DESC}
          </Text>
          <Text style={[h5, {color: '#fff'}]}>
            Terima kasih sudah memesan di Xhalona
          </Text>
        </View>

        <View style={{paddingHorizontal: 16, paddingTop: 20}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>Informasi Pesanan</Text>
            <Text
              onPress={() =>
                navigation.navigate('OrderStatus', {SALES_ID: item?.SALES_ID})
              }
              style={[h5, {color: theme.colors.pink}]}>
              Lacak
            </Text>
          </View>

          <View>
            <Text
              style={[
                h5,
                {marginTop: 10, color: theme.colors.pink, fontSize: 14},
              ]}>
              ● {detailOder?.[0]?.STATUS_DESC}
            </Text>
            <Text style={[h5, {color: theme.colors.grey4, marginLeft: 10}]}>
              {moment(detailOder?.[0]?.STATUS_LAST_DATE)?.format(
                'dddd, DD MMMM YYYY HH:mm',
              )}
            </Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>Alamat Pemesan</Text>
            <Text style={[h5, {color: theme.colors.pink}]}>Salin</Text>
          </View>

          <View>
            <Text
              style={[
                h5,
                {color: theme.colors.grey4, marginTop: 10, lineHeight: 20},
              ]}>
              {item?.ORDER_ADDRESS}
            </Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>
              {detailTrx?.[0]?.COMPANY_ID}
            </Text>
            <Text style={[h5, {color: theme.colors.pink}]}>Kunjungi salon</Text>
          </View>

          {detailTrx?.map((x, i) => (
            <View style={{marginTop: 10}} key={i.toString()}>
              <View
                style={[
                  rowCenter,
                  {
                    alignItems: 'flex-start',
                    height: 70,
                    justifyContent: 'space-between',
                  },
                ]}>
                <View style={[rowCenter]}>
                  <Image
                    source={img_hair}
                    style={[iconCustomSize(70), {borderRadius: 10}]}
                  />
                  <View
                    style={{
                      justifyContent: 'space-around',
                      height: '100%',
                      marginLeft: 10,
                    }}>
                    <Text style={[h1]}>{x?.PART_NAME}</Text>
                    <Text
                      style={[h1, {color: theme.colors.pink, fontSize: 14}]}>
                      {currencyFormat(x?.PRICE)}
                    </Text>
                  </View>
                </View>
                <Text style={{alignSelf: 'flex-end'}}>1x</Text>
              </View>
            </View>
          ))}
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>Metode Pemesanan</Text>
            <Text style={[h1, {color: theme.colors.pink}]}>
              {item?.BOOKING_TYPE}
            </Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>Metode Pembayaran</Text>
            <Text style={[h1, {color: theme.colors.pink}]}>
              {item?.SETTLE_PAYMENT_METHOD}
            </Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>No. Pesanan</Text>
            <Text style={[h1, {color: theme.colors.pink}]}>
              {item?.SALES_ID}
              <Text style={[h5, {color: theme.colors.pink}]}> | salin</Text>
            </Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <Text style={[h1, {fontSize: 14}]}>Rincian Pesanan</Text>

          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginTop: 5},
            ]}>
            <Text>Biaya Layanan</Text>
            <Text style={[h1, {color: theme.colors.pink, fontSize: 13}]}>
              {currencyFormat(item?.DELIVERYCOST_VAL)}
            </Text>
          </View>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginTop: 5},
            ]}>
            <Text>Diskon</Text>
            <Text style={[h1, {color: theme.colors.pink, fontSize: 13}]}>
              {currencyFormat(item?.DISC_PCT)}
            </Text>
          </View>
          <View
            style={[
              rowCenter,
              {justifyContent: 'space-between', marginTop: 5},
            ]}>
            <Text>Total Harga ({detailTrx?.length} item)</Text>
            <Text style={[h1, {color: theme.colors.pink, fontSize: 13}]}>
              {currencyFormat(item?.BRUTO_VAL)}
            </Text>
          </View>
          <View style={styles.lineHorizontal} />
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={[rowCenter, {justifyContent: 'space-between'}]}>
            <Text style={[h1, {fontSize: 14}]}>Total Pembayaran</Text>
            <Text style={[h1, {color: theme.colors.pink, fontSize: 16}]}>
              {currencyFormat(item?.NETTO_VAL)}
            </Text>
          </View>
          {/* <View style={styles.lineHorizontal} /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  lineHorizontal: {
    borderBottomColor: theme.colors.grey6,
    borderBottomWidth: 1,
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
