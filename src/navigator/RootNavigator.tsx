import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import MainStackNavigator from './MainStackNavigator';

const Router: React.FC = () => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Router;
