import Navigator from './components/Navigator';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { SQLiteProvider } from 'expo-sqlite';
import { createTables } from './services/db';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PK } from '@env';
import { AppContext, Theme } from './styles/Theme.style';

const App = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const lockOrientation = async () => {
      await lockAsync(OrientationLock.PORTRAIT_UP);
  };

  useEffect(() => {
      lockOrientation();
  }, []);
  
  return (
    <StripeProvider publishableKey={STRIPE_PK} merchantIdentifier="univ.com.barcodescanner">
      <SQLiteProvider databaseName="Basket.db" onInit={createTables}>
        <NavigationContainer theme={isLightTheme ? Theme.light : Theme.dark}>
          <AppContext.Provider value={{context: isLightTheme, setContext: setIsLightTheme}}>
            <Navigator/>
          </AppContext.Provider>
        </NavigationContainer>
      </SQLiteProvider>
    </StripeProvider>
  );
}

export default App;