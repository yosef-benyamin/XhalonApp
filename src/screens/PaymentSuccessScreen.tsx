import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {currencyFormat} from 'utils/currencyFormat';
import {h1, h3} from 'utils/styles';
import Button from 'components/Button';
import {rowCenter} from 'utils/mixins';
import {useNavigation} from '@react-navigation/native';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={[h1, {}]}>Pembayaran Telah Berhasil</Text>
      <Text style={[h1, {fontSize: 20}]}>Terima Kasih</Text>
      <Text style={[h1, {}]}>{currencyFormat(50000)}</Text>
      <Text style={[h1, {}]}>No. Pesanan Anda</Text>
      <Text style={[h3, {}]}>3230230910239012</Text>

      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', marginTop: '20%'},
        ]}>
        <Button
          title="Beranda"
          _theme="pink"
          onPress={() => {
            navigation.navigate('MainTab');
          }}
          styleWrapper={{width: '40%'}}
        />
        <View style={{width: '10%'}} />
        <Button
          title="Lanjutan Belanja"
          _theme="pink"
          onPress={() => {
            navigation.navigate('MainTab');
          }}
          styleWrapper={{width: '40%'}}
        />
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({});
