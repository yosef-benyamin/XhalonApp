import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { IProduct, IStore } from './products.types';

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
  ProductDetail: {
    dataProduct: IProduct;
  },
  CartList: undefined;
  Checkout: undefined;
  PaymentSuccess: undefined;
  FormBookingOrder: {
    BOOKING_DATE: string;
    BOOKING_TYPE: string;
  };
  OtpVerification: undefined;
  DefaultFormUser: undefined;
  BookingOrder: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Product: {
    ANALISA_ID_GLOBAL?: string;
  };
  OfficialSalon: undefined;
  Favorite: undefined;
  Transaction: undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

type navigationProps = StackNavigationProp<RootStackParamList>;

export type {RootStackParamList, navigationProps, RootTabParamList};
