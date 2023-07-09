import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
// import {RootStackParamList} from '../types/navigator';
import {
  BookingOrderScreen,
  CartListScreen,
  CheckoutScreen,
  DefaultFormUser,
  FormBookingOrderScreen,
  LoginScreen,
  OtpVerificationScreen,
  PaymentSuccessScreen,
  RegisterScreen,
  SalonDetailScreen,
} from '../screens';
import MainTabNavigator from './MainTabNavigator';
import {theme} from 'utils';
import MainTab from './MainTabNavigator';
import {StyleSheet, View} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Drawer from 'components/Drawer';
import {useDrawerStore} from 'store/effects/drawerStore';
import {WINDOW_HEIGHT, drawer_width} from 'utils/mixins';
import {useAuthStore} from 'store/actions/AuthStore';
import {AuthState} from 'types/auth.types';
import { RootStackParamList } from 'types/navigator';
import ProductDetailScreen from 'screens/SalonDetailScreen/ProductDetail';
import PaymentScreen from 'screens/PaymentScreen';
import SearchScreen from 'screens/SearchScreen';
import TransactionDetailScreen from 'screens/TransactionDetailScreen';
import OrderStatusScreen from 'screens/OrderStatusScreen';

const RootStack = createStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  const leftValue = useSharedValue(0);
  const isAuthenticated = useAuthStore(
    (state: AuthState) => state.isAuthenticated,
  );
  // const openDrawer = useAppSelector(utilsState).isShowDrawer;
  const openDrawer = useDrawerStore() as any;

  const rLeft = useAnimatedStyle(() => {
    return {
      left: leftValue.value,
    };
  });

  useEffect(() => {
    leftValue.value = withTiming(!openDrawer.isShowDrawer ? 0 : drawer_width);
    console.log('opening = ', openDrawer.isShowDrawer);
  }, [openDrawer.isShowDrawer]);

  return (
    <View style={{flex: 1}}>
      <Animated.View style={styles.drawerWrapper}>
        <Drawer />
      </Animated.View>
      <Animated.View style={[rLeft, {flex: 1}]}>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            animationTypeForReplace: 'push',
          }}
          initialRouteName="MainTab">
          <>
            {!isAuthenticated ? (
              <>
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="Register" component={RegisterScreen} />
                <RootStack.Screen
                  name="OtpVerification"
                  component={OtpVerificationScreen}
                />
              </>
            ) : (
              <>
                <RootStack.Screen
                  name="DefaultFormUser"
                  component={DefaultFormUser}
                />
                <RootStack.Screen
                  name="BookingOrder"
                  component={BookingOrderScreen}
                />
                <RootStack.Screen
                  name="FormBookingOrder"
                  component={FormBookingOrderScreen}
                />
                <RootStack.Screen
                  name="PaymentSuccess"
                  component={PaymentSuccessScreen}
                />
                <RootStack.Screen name="Checkout" component={CheckoutScreen} />
                <RootStack.Screen
                  name="SalonDetail"
                  component={SalonDetailScreen}
                />
                <RootStack.Screen
                  name="ProductDetail"
                  component={ProductDetailScreen}
                />
                <RootStack.Screen name="MainTab" component={MainTab} />
                <RootStack.Screen name="CartList" component={CartListScreen} />
                <RootStack.Screen name="Payment" component={PaymentScreen} />
                <RootStack.Screen name="Search" component={SearchScreen} />
                <RootStack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
                <RootStack.Screen name="OrderStatus" component={OrderStatusScreen} />
              </>
            )}
          </>
        </RootStack.Navigator>
      </Animated.View>
    </View>
  );
};

export default MainStack;

const styles = StyleSheet.create({
  drawerWrapper: {
    // justifyContent: 'center',
    width: drawer_width,
    height: WINDOW_HEIGHT,
    position: 'absolute',
  },
});
