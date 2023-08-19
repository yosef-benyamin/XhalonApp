import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {  } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ic_beard } from 'assets/images';
import { theme } from 'utils';

const ProfileDetailScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={[styles.imgIconButton, { transform: [{ rotate: '180deg' }] }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.textProfile}>Profile</Text>
      </View>
      <View style={styles.viewImg}>
        <Image source={ic_beard} style={styles.img} />
        <View>
          <Text style={styles.textNormal}>Cynthia Harris</Text>
          <Text style={styles.textNormal}>@CynthiaHarris</Text>
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/gender.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Jenis Kelamin</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>Laki - laki</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/calendar.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Tanggal Lahir</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>Palembang 06-11-1994</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/mail.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Email</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>stefan.peeters@hotmail.co.uk</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/phone.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>No. Handphone</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>(021) 353-3906</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/lock.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Change Password</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>****************</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.viewMenu}>
        <View style={styles.viewSubMenu}>
          <Image
            source={require('../assets/icons/pinpoint.png')}
            style={styles.imgIconMenu}
            resizeMode="contain"
          />
          <Text style={styles.textBlackLarge}>Alamat</Text>
        </View>
        <View style={styles.viewSubMenu}>
          <Text>Jl Dewi Sartika No 35</Text>
          <Image
            source={require('../assets/icons/arrow-right-grey.png')}
            style={styles.imgIconButton}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#88878F',
    marginHorizontal: 10,
  },
  viewSubMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewImg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgIconMenu: {
    width: 15,
    height: 15,
  },
  imgIconButton: {
    margin: 4,
    height: 19,
    width: 19,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 60,
    backgroundColor: theme.colors.grey0,
    margin: 10,
  },
  textProfile: {
    color: theme.colors.black,
    fontSize: 24,
    fontFamily: theme.Text.style.fontFamily,
    padding: 10,
  },
  textNormal: {
    color: theme.colors.black,
    fontSize: 10,
    fontWeight: 'bold',
  },
  textBlackLarge: {
    color: theme.colors.black,
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
  },
});
