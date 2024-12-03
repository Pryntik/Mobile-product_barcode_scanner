import Navigator from './components/Navigator';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { SQLiteProvider } from 'expo-sqlite';
import { createTables } from './services/db';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PK } from '@env';
import { AppContext, LightTheme, DarkTheme } from './styles/Theme.style';

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(LightTheme);

  const lockOrientation = async () => {
      await lockAsync(OrientationLock.PORTRAIT_UP);
  };

  useEffect(() => {
      setTheme(isDark ? DarkTheme : LightTheme);
  }, [isDark]);

  useEffect(() => {
      lockOrientation();
  }, []);
  
  return (
    <StripeProvider publishableKey={STRIPE_PK} merchantIdentifier="univ.com.barcodescanner">
      <SQLiteProvider databaseName="Basket.db" onInit={createTables}>
        <NavigationContainer theme={theme}>
          <AppContext.Provider value={{isDark, setIsDark}}>
            <Navigator/>
          </AppContext.Provider>
        </NavigationContainer>
      </SQLiteProvider>
    </StripeProvider>
  );
}

export default App;