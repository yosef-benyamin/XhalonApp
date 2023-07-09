import React from 'react';
import Router from './navigator/RootNavigator';
import Toast from 'react-native-toast-message';

const index: React.FC = () => {
  return (
    <>
      <Router />
      <Toast />
    </>
  );
};

export default index;
