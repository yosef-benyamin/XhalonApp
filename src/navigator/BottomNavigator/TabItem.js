import {
  ic_bag_active,
  ic_bag_inactive,
  ic_bill_active,
  ic_bill_inactive,
  ic_document_active,
  ic_document_inactive,
  ic_favorite_active,
  ic_favorite_inactive,
  ic_home_active,
  ic_home_inactive,
  ic_message_active,
  ic_message_inactive,
  ic_profile_active,
  ic_profile_inactive,
  ic_store_active,
  ic_store_inactive,
} from 'assets/icons';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { authState, logout } from 'redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import theme from 'utils/theme';

const TabItem = ({title, active, onPress, onLongPress}) => {

  const Icon = () => {
    if (title === 'Home') {
      return active ? (
        <Image source={ic_home_active} style={styles.icon} resizeMode="contain" />
      ) : (
        <Image source={ic_home_active} style={styles.icon} resizeMode="contain" />
      );
    }
    if (title === 'Produk') {
      return active ? (
        <Image
          source={ic_bag_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_bag_active} style={styles.icon} resizeMode="contain" />
      );
    }
    if (title === 'Official Salon') {
      return active ? (
        <Image
          source={ic_store_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_store_active} style={styles.icon} resizeMode="contain" />
      );
    }
    if (title === 'Favorite') {
      return active ? (
        <Image
          source={ic_favorite_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_favorite_active} style={styles.icon} resizeMode="contain" />
      );
    }
    if (title === 'Transaksi') {
      return active ? (
        <Image
          source={ic_bill_active}
          style={styles.icon}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_bill_active} style={styles.icon} resizeMode="contain" />
      );
    }
    return <Image source={ic_home_active} style={styles.icon} />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // height: 35,
    padding: 3,
    
    margin: 5,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8,
  },
  text: active => ({
    fontSize: 10,
    color: active ? theme.colors.pink : theme.colors.pink,
    fontWeight: '600',
    marginTop: 4,
  }),
  icon: {
    height: 20,
    width: 20,
  },
});
