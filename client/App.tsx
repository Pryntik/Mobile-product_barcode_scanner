import React from 'react';
import Panier from './pages/Panier';
import HistoriqueAchat from './pages/HistoriqueAchat';
import Accueil from './pages/Accueil';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const App = () => {
  const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Accueil'>
        <Tab.Screen name="Accueil" component={Accueil} />
        <Tab.Screen name="Panier" component={Panier} />
        <Tab.Screen name="HistoriqueAchat" component={HistoriqueAchat} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;