import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Timeline} from 'react-native-just-timeline';
import { Mixins, theme } from 'utils';
// import {Mixins, theme} from '@utils/index';

const TimeLine = ({data}: any) => {
  data = data.map((v: any, index: number, arr: any[]) => ({
    ...v,
    icon: () => (
      <View style={styles.iconStyle}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            color: theme.colors.pink
          }}
        >
          {arr.length - index}
        </Text>
      </View>
    )
  }));

  return (
    <Timeline data={data} iconContainerStyle={styles.iconContainerStyle} />
  );
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    paddingTop: 10
  },
  iconStyle: {
    width: Mixins.scaleSize(25),
    height: Mixins.scaleSize(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.pink,
    borderWidth: Mixins.scaleSize(3),
    fontSize: 16,
    // paddingTop: 6,
    borderRadius: 18
  }
});

export default TimeLine;
