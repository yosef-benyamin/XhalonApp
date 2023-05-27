import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { IStore } from './products.types';

type RootStackParamList = {
  MainTab?: RootTabParamList;
  Login: undefined;
  Auth: undefined;
  Register: undefined;
  RegisterPassword: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  SalonDetail: {
    dataStore: IStore;
  },
  CartList: undefined;
  Checkout: undefined;
  PaymentSuccess: undefined;
  FormBookingOrder: undefined;
  OtpVerification: undefined;
  DefaultFormUser: undefined;
  BookingOrder: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Booking: undefined;
  Inbox: undefined;
  Account: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

type navigationProps = StackNavigationProp<RootStackParamList>;

export type {RootStackParamList, navigationProps, RootTabParamList};
