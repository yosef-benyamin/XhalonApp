import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ic_arrow_left_black} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {h1, h4, h5} from 'utils/styles';
import {ic_beard} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import {listHistory} from 'store/effects/productStore';
import {IHistory} from 'types/products.types';
import ChipSelect from 'components/Chip/ChipSelect';
import { theme } from 'utils';

const TransactionScreen = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [history, setHistory] = useState<IHistory[]>([]);

  const [selected, setSelected] = useState('NEW_APP');
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
              Transaksi Saya
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    getHistory();
    return () => {};
  }, [selected]);

  let getHistory = async () => {
    setLoader(true);
    setHistory([]);
    try {
      let i = DATA.findIndex(y => y.title === selected);
      let res = await listHistory(DATA[i]?.status);
      setLoader(false);
      console.log('ress = ', res);
      if (res?.rs?.RESULT_CODE === '01') {
        setHistory(res?.rs?.DATA);
        return;
      }
    } catch (error) {}

    setLoader(false);
  };

  const DATA = [
    // {
    //   title: 'Riwayat',
    //   status: 'NEW_APP',
    // },
    {
      title: 'Sudah Dibayar',
      status: 'RESPONSE',
    },
    {
      title: 'Pembatalan',
      status: 'CANCEL',
    },
    {
      title: 'Selesai',
      status: 'FINISH',
    },
  ];

  return (
    <View style={{flex: 1, padding: 16, backgroundColor: '#fff'}}>
      <View>
        <ScrollView horizontal>
          {/* {DATA.map((x, i) => (
            <TouchableOpacity key={i} onPress={() => setSelected(x.status)}>
              <Text
                style={{
                  marginRight: 10,
                  color: '#000',
                  textDecorationLine:
                    selected === x.status ? 'underline' : 'none',
                  paddingBottom: 10,
                  fontWeight: selected === x.status ? '700' : '300',
                }}>
                {x.title}
              </Text>
            </TouchableOpacity>
          ))} */}
          <ChipSelect
            items={DATA?.map(x => x.title)}
            selected={selected}
            setSelected={(x: any) => {
              let i = DATA.findIndex(y => y.title === x);
              setSelected(DATA[i]?.title);
            }}
          />
        </ScrollView>
        {loader && <ActivityIndicator size={'small'} color={'green'} />}
        <FlatList
          data={history}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[rowCenter, styles.card]}
              onPress={() =>
                navigation.navigate('TransactionDetail', {
                  item: item,
                })
              }>
              <View style={[rowCenter]}>
                <Image source={ic_beard} style={iconCustomSize(50)} />

                <View style={{marginLeft: 20}}>
                  <Text style={[h1]}>{item?.COMPANY_ID}</Text>
                  <Text style={[h1, {color: 'green', marginVertical: 5}]}>
                    {item?.STATUS_ID_DESC}
                  </Text>
                  <Text style={[h5, {fontSize: 10}]}>{item?.BOOKING_DATE}</Text>
                </View>
              </View>

              <View style={{alignSelf: 'flex-end'}}>
                <Text style={[h1]}>{currencyFormat(item?.NETTO_VAL)}</Text>
                <Text style={[h1, {color: theme.colors.pink,}]}>{item?.BOOKING_TYPE}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey6,
    marginVertical: 10,
    paddingBottom: 10,
  },
});
