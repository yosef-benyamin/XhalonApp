import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { ic_crown, ic_pinpoin, ic_stars, ic_love, ic_heart, ic_heart_line } from 'assets/icons';
import { img_barber } from 'assets/images';
import { currencyFormat } from 'utils/currencyFormat';
import { rowCenter, iconSize } from 'utils/mixins';
import { h2, h4 } from 'utils/styles';
import { useNavigation } from '@react-navigation/native';
import { IProduct } from 'types/products.types';
import { useFavoriteStore } from 'store/actions/favoritStore';
import { addFavorit, deleteFavorit } from 'store/effects/favoritStore';
import { BASE_URL } from '@env';

const ProductCard = ({
    item,
    func
}: {
    item:IProduct;
    func?: any
}) => {
    const navigation = useNavigation();
    const favoriteStore = useFavoriteStore(state => state);


  const getFav=async()=> {
    // setLoader(true)
    favoriteStore.getFavorite();
    // setLoader(false)
  }

  const handleDeleteFav = async (id: any) => {
    let _ = [];
    _.push({
      PART_ID: id,
    });
    
    let res = await deleteFavorit(_);
    getFav();
  };

  const handleAddFav = async (id: any) => {
    let _ = [];
    _.push({
      PART_ID: id,
    });
    
    let res = await addFavorit(_);
    getFav();
  };


  return (
    <TouchableOpacity
      style={{
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
      }}
      onPress={() =>
        {
          if(func) func()
          setTimeout(() => {
            navigation.navigate('ProductDetail', {
              dataProduct: item,
            })
          }, 0);
        }
      }>
      <Image source={{uri: BASE_URL +'/'+ item?.MAIN_IMAGE}} style={{height: 123, width: '100%'}} />
      <View
        style={[
          rowCenter,
          {justifyContent: 'space-between', alignItems: 'flex-start'},
        ]}>
        <View>
          <Text style={[h2, {width: '70%'}]}>{item?.PART_NAME}</Text>
          {item?.DISCOUNT_VAL === 0 && <Text style={[h4, {fontSize: 12}]}>
            {currencyFormat(item?.UNIT_PRICE)}
          </Text>}

          {item?.DISCOUNT_VAL !== 0 && <Text style={{fontSize: 10}}>
            {`${item?.DISCOUNT_VAL}% `}
            <Text>{currencyFormat(item?.UNIT_PRICE_NET)}</Text>
          </Text>}

          <View style={rowCenter}>
            <Image source={ic_crown} style={iconSize} resizeMode={'contain'} />
            <Text>{item?.COMPANY_NAME}</Text>
          </View>

          {/* <Text>buka pukul 09:00 sampai 18:00 senin - minggu</Text> */}

          {/* <View style={rowCenter}>
            <Image
              source={ic_pinpoin}
              style={iconSize}
              resizeMode={'contain'}
            />
            <Text>{item?.}</Text>
          </View> */}

          <View style={rowCenter}>
            <Image
              source={ic_stars}
              style={{width: 50, height: 10}}
              resizeMode={'contain'}
            />

            <Text>5.0 | Terjual 10Rb</Text>
          </View>
        </View>
        <View />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            right: 0,
          }}
          onPress={()=> {
            console.log('part id = ', favoriteStore?.listFavorite?.find(x=> x?.NO_TRX === item?.PART_ID));
            if(favoriteStore?.listFavorite?.find(x=> x?.PART_ID === item?.PART_ID)?.PART_ID) {
              handleDeleteFav(item.PART_ID)
            } else {
              handleAddFav(item.PART_ID)
            }
          }}
          >
          <Image source={favoriteStore?.listFavorite?.find(x=> x?.PART_ID === item?.PART_ID)?.PART_ID ? ic_heart : ic_heart_line} style={iconSize} resizeMode={'contain'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
