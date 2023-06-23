import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {RootTabParamList} from '../types/navigator';
import {
  FavoriteScreen,
  HomeScreen,
  LoginScreen,
  OfficialSalonScreen,
  ProductScreen,
  TransactionScreen
} from '../screens';
import BottomNavigator from './BottomNavigator';
import {useFocusEffect} from '@react-navigation/native';
import {Animated} from 'react-native';
import {theme} from 'utils';

const RootTab = createBottomTabNavigator<RootTabParamList>();



const MainTab: React.FC = () => {
  return (
    <RootTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}
      tabBar={(props: any) => <BottomNavigator {...props} />}>
      <RootTab.Screen name="Home" component={HomeScreen} />
      <RootTab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarLabel: 'Produk',
          headerStyle: {
            backgroundColor: theme.colors.navy,
          },
        }}
      />
      <RootTab.Screen
        name="OfficialSalon"
        component={OfficialSalonScreen}
        options={{
          tabBarLabel: 'Official Salon',
          headerStyle: {
            backgroundColor: theme.colors.navy,
          },
        }}
      />
      <RootTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarLabel: 'Favorite',
          headerStyle: {
            // backgroundColor: theme.colors.navy,
          },
        }}
      />
      <RootTab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarLabel: 'Transaksi',
          headerStyle: {
            // backgroundColor: theme.colors.navy,
          },
        }}
      />
    </RootTab.Navigator>
  );
};

export default MainTab;
