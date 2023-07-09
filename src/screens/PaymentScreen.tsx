import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation()
  console.log('route? = ', route.params)

  useEffect(() => {
    const handleBackPress = () => {
      // Write your logic here for handling the back button press
      navigation.navigate('PaymentSuccess'); 
      // Return 'true' to indicate that the back button event has been handled
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <WebView source={{ uri: route?.params?.url }} style={{ flex: 1 }} />
  )
}

export default PaymentScreen

const styles = StyleSheet.create({});