import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  ic_box_active,
  ic_box_inactive,
  ic_drawer_active,
  ic_drawer_inactive,
  ic_img_active,
  ic_img_inactive,
  ic_market_active,
  ic_market_inactive,
  ic_star,
  ic_star_active,
} from 'assets/icons';
import {iconCustomSize, iconSize, rowCenter} from 'utils/mixins';
import HomeTab from './HomeTab';
import InventoryTab from './InventoryTab';

type ITab = 'home' | 'inventory' | 'kategory' | 'feed' | 'review';

const TopNavigation = ({COMPANY_ID, open, setOpen}: {COMPANY_ID: string; open: boolean; setOpen:any}) => {
  const MENUS = ['home', 'inventory', 'review'];
  const [activeTab, setActiveTab] = useState<ITab>('home');

  const ImgGen = (t: ITab, isActive: boolean) => {
    if (t === 'home') {
      return (
        <Image
          source={isActive ? ic_market_active : ic_market_inactive}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
      );
    }
    if (t === 'inventory') {
      return (
        <Image
          source={isActive ? ic_box_active : ic_box_inactive}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
      );
    }
    if (t === 'kategory') {
      return (
        <Image
          source={isActive ? ic_drawer_active : ic_drawer_inactive}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
      );
    }
    if (t === 'feed') {
      return (
        <Image
          source={isActive ? ic_img_active : ic_img_inactive}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
      );
    }
    if (t === 'review') {
      return (
        <Image
          source={isActive ? ic_star_active : ic_star}
          style={iconCustomSize(25)}
          resizeMode={'contain'}
        />
      );
    }
  };

  return (
    <View>
      <View
        style={[rowCenter, {justifyContent: 'space-around', marginTop: 15}]}>
        {MENUS.map((x: any, i) => (
          <TouchableOpacity key={i} onPress={() => setActiveTab(x)}>
            {ImgGen(x, activeTab === x)}
          </TouchableOpacity>
        ))}
      </View>
      <View style={{margin: 16}}>
        {activeTab === 'home' && <HomeTab COMPANY_ID = {COMPANY_ID} />}
        {activeTab === 'inventory' && <InventoryTab COMPANY_ID = {COMPANY_ID} open={open} setOpen={setOpen} />}
      </View>
      
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({});
