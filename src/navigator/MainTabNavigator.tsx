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

// const FadeInView = (props: any) => {
//   const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

//   useFocusEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();
//     return () => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 250,
//         useNativeDriver: true,
//       }).start();
//     };
//   });

//   return (
//     <Animated.View // Special animatable View
//       style={{
//         flex: 1,
//         opacity: fadeAnim, // Bind opacity to animated value
//       }}>
//       {props.children}
//     </Animated.View>
//   );
// };

// const FadeHomeScreen = (props: any) => (
//   <FadeInView>
//     <LoginScreen {...props} />
//   </FadeInView>
// );

// const FadeBookingScreen = (props: any) => (
//   <FadeInView>
//     <LoginScreen {...props} />
//   </FadeInView>
// );

// const FadeInboxScreen = (props: any) => (
//   <FadeInView>
//     <LoginScreen {...props} />
//   </FadeInView>
// );

// const FadeAccountScreen = (props: any) => (
//   <FadeInView>
//     <LoginScreen {...props} />
//   </FadeInView>
// );

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
