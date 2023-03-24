import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { confirmPayment } = useStripe();

  const handleCardDetailsChange = (cardDetails) => {
    console.log(cardDetails);
  };

  const handlePayPress = async () => {
    setIsLoading(true);

    try {
      const { paymentIntent, error } = await confirmPayment({
        payment_method: {
          card: {
            number: '4242424242424242',
            exp_month: 11,
            exp_year: 23,
            cvc: '123',
          },
        },
        amount: 1000, // $10.00 in cents
        currency: 'usd',
        description: 'Test payment',
      });

      if (error) {
        setIsLoading(false);
        setErrorMessage(`Payment failed: ${error.message}`);
        console.log('Payment failed', error.message);
      } else {
        setIsLoading(false);
        console.log('Payment succeeded:', paymentIntent);
        // Navigate to the success screen
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
      console.log('Payment failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter payment details:</Text>
      <CardField
        postalCodeEnabled={false}
        
        cardStyle={styles.cardStyle}
        style={styles.cardField}
        onCardChange={handleCardDetailsChange}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={isLoading ? 'Processing...' : 'Pay'}
          disabled={isLoading}
          onPress={handlePayPress}
        />
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardField: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f6f9fc',
    marginBottom: 20,
  },
  cardStyle: {
    fontSize: 18,
    color: '#1c1e21',
    letterSpacing: 1.5,
    fontFamily: 'Courier',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default PaymentScreen;
