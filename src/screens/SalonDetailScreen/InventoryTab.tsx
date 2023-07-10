import {
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {ic_filter, ic_grid} from 'assets/icons';
import {WINDOW_HEIGHT, WINDOW_WIDTH, iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {h1, h5} from 'utils/styles';
import GridFlatList from 'grid-flatlist-react-native';
import HomeItemCard from './ItemCard';
import {useProductStore} from 'store/actions/ProductStore';
import Button from 'components/Button';

const InventoryTab = ({COMPANY_ID, open, setOpen}: {COMPANY_ID: string; open: boolean; setOpen: any}) => {
  const ProductStore = useProductStore(state => state);

  const renderItem: ListRenderItem<any> = useCallback(
    item => <HomeItemCard item={item} />,
    [],
  );

  return (
    <>
      <View style={{flex: 1}}>
        <View style={[rowCenter, {justifyContent: 'space-between'}]}>
          <TouchableOpacity
            onPress={() => setOpen(prev => !prev)}
            style={[
              rowCenter,
              {
                padding: 10,
                elevation: 4,
                backgroundColor: '#fff',
                borderRadius: 8,
              },
            ]}>
            <Image source={ic_filter} style={iconSize} />
            <Text style={{color: theme.colors.pink}}> Filter</Text>
          </TouchableOpacity>

          <View style={[rowCenter]}>
            <Text style={[h1]}>Tampilkan Semua </Text>
            <Image source={ic_grid} style={iconSize} />
          </View>
        </View>

        <Text
          style={[
            h5,
            {color: theme.colors.grey3, fontSize: 16, marginVertical: 10},
          ]}>
          {ProductStore?.product?.length} Produk
        </Text>

        <GridFlatList
          data={ProductStore?.product?.filter(x => x.COMPANY_ID === COMPANY_ID)}
          // data={[]}
          renderItem={renderItem}
          keyExtractor={(_item, index) => `${index}`}
          numColumns={2}
          style={{
            backgroundColor: theme.colors.white,
            marginTop: 10,
            width: '100%',
            alignSelf: 'center',
          }}
          ListFooterComponent={() => <View style={{marginBottom: 170}} />}
          // onEndReached={() => method.getProduct()}
          // onRefresh={async () => method.refresh()}
          // refreshing={appData.isLoading}
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
    </>
  );
};

export default InventoryTab;

const styles = StyleSheet.create({});
