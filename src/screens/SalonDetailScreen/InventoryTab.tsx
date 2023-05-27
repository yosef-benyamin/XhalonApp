import {Image, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, { useCallback } from 'react';
import {ic_filter, ic_grid} from 'assets/icons';
import {iconSize, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import {h1} from 'utils/styles';
import GridFlatList from 'grid-flatlist-react-native';
import HomeItemCard from './ItemCard';
const InventoryTab = () => {
  const renderItem: ListRenderItem<any> = useCallback(
    item => <HomeItemCard />,
    [],
  );

  return (
    <View style={{flex: 1}}>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <View
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
        </View>

        <View style={[rowCenter]}>
          <Text style={[h1]}>Tampilkan Semua </Text>
          <Image source={ic_grid} style={iconSize} />
        </View>
      </View>

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
  );
};

export default InventoryTab;

const styles = StyleSheet.create({});

