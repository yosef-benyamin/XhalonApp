import {
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ic_arrow_left_black,
  ic_chat,
  ic_crown,
  ic_love,
  ic_pinpoin,
  ic_stars,
} from 'assets/icons';
import appBar from 'components/AppBar/AppBar';
import {rowCenter, iconSize, WINDOW_WIDTH} from 'utils/mixins';
import {h1, h2, h4} from 'utils/styles';
import GridFlatList from 'grid-flatlist-react-native';
import {theme} from 'utils';
import {img_barber} from 'assets/images';
import {currencyFormat} from 'utils/currencyFormat';
import Button from 'components/Button';

const FavoriteScreen = () => {
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
              Favorit Saya
            </Text>
          </TouchableOpacity>
        ),
      }),
    );
  }, [navigation]);

  const renderItem: ListRenderItem<any> = useCallback(
    item => (
      <TouchableOpacity
        style={{
          elevation: 5,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <Image source={img_barber} style={{height: 123, width: '100%'}} />
        <View
          style={[
            // rowCenter,
            {justifyContent: 'space-between', alignItems: 'center'},
          ]}>
          <View style={{alignItems: 'center', padding: 10}}>
            <Text style={[h2]}>Catok</Text>

            <Image
              source={ic_stars}
              style={{width: 50, height: 10}}
              resizeMode={'contain'}
            />

            <Text style={[h4, {fontSize: 12}]}>{currencyFormat(40000)}</Text>
            <View style={{width: WINDOW_WIDTH/4}}>
              <Button _theme="pink" title="Kunjungi" onPress={() => {}} />
            </View>
          </View>

          <Image
            source={ic_love}
            style={[iconSize, {position: 'absolute', bottom: 10, right: 10}]}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={{flex: 1}}>
      <GridFlatList
        data={[...Array(10).fill(0)]}
        // data={[]}
        renderItem={renderItem}
        keyExtractor={(_item, index) => `${index}`}
        numColumns={2}
        style={{
          backgroundColor: theme.colors.cloud,
          width: '100%',
          alignSelf: 'center',
          margin: 16
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
        gap={10}
        accessibilityComponentType={undefined}
        accessibilityTraits={undefined}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
