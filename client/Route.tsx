import * as React from 'react';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './CheckoutScreen';
import PagePanier from './PagePanier';
import HistoriqueAchat from './HistoriqueAchat';
import Accueil from './Accueil';

const Tab = createBottomTabNavigator();

export const Route = () => {
  const stripePK = Constants?.expoConfig?.extra?.stripePK;
  return (
    <Tab.Navigator initialRouteName='Accueil'>
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="PagePanier" component={PagePanier} />
      <Tab.Screen name="HistoriqueAchat" component={HistoriqueAchat} />
    </Tab.Navigator>
  );
}