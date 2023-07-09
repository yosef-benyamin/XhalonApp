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
import {IHistory} from 'types/products.types';
import {
  getOrderStatus,
  listDetailTransaction,
} from 'store/effects/productStore';
import moment from 'moment';
import TimeLine from 'components/Timeline';

type ITabKeys = 'semua' | 'diskon' | 'pesan_lagi';

interface ITabs {
  title: string;
  keys: ITabKeys;
}

const OrderStatusScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const SALES_ID: string = route?.params?.SALES_ID;
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
              Status Pesanan
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    getDetail();
    return () => {};
  }, [navigation]);

  const getDetail = async () => {
    const res = await getOrderStatus(SALES_ID);

    console.log('ress22 = ', res?.rs);

    if (res?.rs?.RESULT_CODE === '01') {
      setDetailTrx(res?.rs?.DATA);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 16}}>
      {detailTrx?.length > 0 && <TimeLine
        data={detailTrx?.map((v: any) => ({
          title: {
            content: v?.STATUS_ID,
          },
          description: ({styles}: any) => (
            <Text style={{fontSize: 10, color: '#999', marginBottom: 7}}>
              {v?.STATUS_DESC}
            </Text>
          ),
          time: {
            content: moment(v?.STATUS_LAST_DATE).format('DD MMM YYYY, HH:mm'),
            // moment(date).utc().format(format)
            // content: Helper.dateFormat(v.time, 'D MMM YYYY HH:mm')
          },
        }))}
      />}
    </View>
  );
};

export default OrderStatusScreen;

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
