import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  KeyboardEvent,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ic_arrow_left_black, ic_search} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import {h1, h2, h3, h4, h5} from 'utils/styles';
import {ic_beard} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import {listHistory} from 'store/effects/productStore';
import {IHistory, IProduct, IStore} from 'types/products.types';
import {useProductStore} from 'store/actions/ProductStore';
import {TextInput} from 'react-native';
import {theme} from 'utils';
import ChipSelect from 'components/Chip/ChipSelect';
import SalonCard from 'components/SalonCard';
import {calculateDistance, getLocation} from 'utils/getDistance';
import ProductCard from 'components/ProductCard';

const SearchScreen = () => {
  const navigation = useNavigation();
  const ProductStore = useProductStore(state => state);
  const [search, setSearch] = useState('');

  const [salon, setSalon] = useState<IStore[]>([]);
  const [produk, setProduk] = useState<IProduct[]>([]);

  const [selectFilter, setSelectFilter] = useState('salon');
  const keyboardRef = useRef()

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
              Cari Store & Produk
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  useEffect(() => {
    ProductStore.getStore();
    ProductStore.getProduct();
    func();
    // keyboardRef.current.focus()

  }, [navigation]);

  useEffect(() => {
    setSalon(ProductStore.store);
    setProduk(ProductStore.product);
    return () => {};
  }, [ProductStore.store, ProductStore.product]);

  const handleSearch = async () => {
    let x: any[] = await ProductStore?.store.filter(y =>
      y.COMPANY_NAME?.toLowerCase().includes(search.toLowerCase()),
    );
    let z: any[] = await ProductStore?.product.filter(a =>
      a.PART_NAME?.toLowerCase().includes(search.toLowerCase()),
    );
    setSalon([...x]);
    setProduk([...z]);
  };

  const [loc, setLoc] = useState<{longitude: number; latitude: number}>({
    latitude: 0,
    longitude: 0,
  });

  const func = async () => {
    let a: any = await getLocation();
    console.log('aaa =', a);
    setLoc(a);
  };

  const _getDistance = (item: IStore) => {
    const lat1 = parseInt(item?.MAP_LOCATION?.split(',')?.[0]); // Latitude titik awal
    const lon1 = parseInt(item?.MAP_LOCATION?.split(',')?.[1]); // Longitude titik awal
    const lat2 = loc?.latitude; // Ganti dengan nilai yang sesuai
    const lon2 = loc.longitude; // Ganti dengan nilai yang sesuai

    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    return distance.toFixed();
  };

  const renderItem: ListRenderItem<any> = useCallback(
    ({item}: {item: IStore}) => (
      <View style={{flex: 1 / 2, marginHorizontal: 3}}>
        {<SalonCard item={item} distance={_getDistance(item)} />}
      </View>
    ),
    [],
  );

  const renderItem2: ListRenderItem<any> = useCallback(
    ({item}: {item: IProduct}) => (
      <View style={{flex: 1 / 2, marginHorizontal: 3}}>
        {<ProductCard item={item}  />}
      </View>
    ),
    [],
  );
  

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={[rowCenter, styles.searchWrapper, {marginHorizontal: 16}]}>
        
        <TextInput
          // ref={keyboardRef}
          autoFocus={true}
          placeholder="Pencarian Salon & produk"
          style={[h5, {padding: 5}]}
          value={search}
          onChangeText={x => setSearch(x)}
          maxLength={20}
          onSubmitEditing={handleSearch}
        />
        <Image
          source={ic_search}
          style={[iconCustomSize(20), {borderRadius: 4}]}
        />
      </View>

      <View style={{marginVertical: 10}} />

      <View style={{marginHorizontal: 16, marginBottom: 20}}>
        <ChipSelect
          items={['salon', 'produk']}
          selected={selectFilter}
          setSelected={setSelectFilter}
        />
      </View>

      {selectFilter === 'salon' && (
        <FlatList
          data={[...(salon || [])]}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(_item, index) => `${index}`}
          contentContainerStyle={{
            padding: 2,
          }}
          ListFooterComponent={() => <View style={{marginBottom: 170}} />}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text>Salon tidak ada</Text>
            </View>
          )}
        />
      )}

      {selectFilter === 'produk' && (
        <FlatList
          data={[...(produk || [])]}
          renderItem={renderItem2}
          numColumns={2}
          keyExtractor={(_item, index) => `${index}`}
          contentContainerStyle={{
            padding: 2,
          }}
          ListFooterComponent={() => <View style={{marginBottom: 170}} />}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <Text>Produk Kosong</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'space-between',
    elevation: 4,
  },
});
