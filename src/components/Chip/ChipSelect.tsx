import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WINDOW_WIDTH, rowCenter} from 'utils/mixins';
import {theme} from 'utils';
import LinearGradient from 'react-native-linear-gradient'; // import LinearGradient
import {h1, h2, h3, h5} from 'utils/styles';

interface CHIPS {
  items: any[];
  selected: string;
  setSelected: any;
}
const ChipSelect = ({items = [], selected, setSelected}: CHIPS) => {
  return (
    <View style={[rowCenter]}>
      {items?.map((x, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.card,
            {
              // backgroundColor:
                // selected === x ? theme.colors.low_pink : theme.colors.grey7,
            },
          ]}
          onPress={() => setSelected(x)}>
          <Text
            style={[
              h5,
              {
                color: selected === x ? theme.colors.pink : '#000',
                fontSize: 18,
                textDecorationLine: selected === x ? 'underline' : 'none'
              },
            ]}>
            {x}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ChipSelect;

const styles = StyleSheet.create({
  card: {
    borderRadius: WINDOW_WIDTH/2,
    paddingHorizontal: 13,
    // paddingVertical: 10,
    marginRight: 10,
  },
});
