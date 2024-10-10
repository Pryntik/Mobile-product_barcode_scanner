import { StripeProvider } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';
import CheckoutScreen from './CheckoutScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PagePanier from './PagePanier';
import HistoriqueAchat from './HistoriqueAchat';
import { Route } from './Route';


export default function App() {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
}

