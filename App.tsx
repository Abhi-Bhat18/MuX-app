import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import CustomCardField from './PaymentScreen';
import {StripeProvider, CardField} from '@stripe/stripe-react-native';
import React from 'react';
import PaymentScreen from './PaymentScreen';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to Mux</Text>
        <StripeProvider
          publishableKey="pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
          <ScrollView>

          <PaymentScreen/>
          </ScrollView>
        </StripeProvider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'whitesmoke',
  },
});
