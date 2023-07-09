import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import {h1} from 'utils/styles';
import {img_barber} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import {theme} from 'utils';
import HomeItemCard from './ItemCard';
import { useProductStore } from 'store/actions/ProductStore';
import ProductCard from 'components/ProductCard';

const HomeTab = ({COMPANY_ID}: {COMPANY_ID: string}) => {
  const ProductStore = useProductStore((state) => state);
  
  return (
    <View>
      <Text style={[h1, {fontSize: 13, marginVertical: 10}]}>Produk Toko</Text>

      <View>
        <ScrollView horizontal>
          {[...ProductStore?.product].map((x, i) => (
            <ProductCard item={x} />
          ))}
        </ScrollView>
      </View>

      {/* <Text style={[h1]}>BIKIN KAMU TERTARIK</Text>

      <View>
        <ScrollView horizontal>
          {[...Array(10)].map((x, i) => (
            <HomeItemCard key={i} />
          ))}
        </ScrollView>
      </View> */}
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  addBox: {
    padding: 2,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.pink,
  },
});
