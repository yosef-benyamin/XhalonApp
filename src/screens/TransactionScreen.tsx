import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ic_arrow_left_black } from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import { rowCenter } from 'utils/mixins';
import { h1 } from 'utils/styles';

const TransactionScreen = () => {

  const navigation = useNavigation();

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
  
  return (
    <View style={{flex: 1, padding: 16}}>
      <View>
        <ScrollView horizontal>
          {['Riwayat', 'Dalam Proses', 'Pembatalan', 'Selesai'].map((x, i)=> (
            <Text key={i} style={{
              marginRight: 10,
              color:'#000'
            }}>{x}</Text>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default TransactionScreen

const styles = StyleSheet.create({})