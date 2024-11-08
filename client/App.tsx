import Navigator from './components/Navigator';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { SQLiteProvider } from 'expo-sqlite';
import { createTables } from './services/db';

const App = () => {
  useEffect(() => {
    const lockOrientation = async () => {
      await lockAsync(OrientationLock.PORTRAIT_UP);
    };
    lockOrientation();
  }, []);
  
  return (
    <SQLiteProvider databaseName="Basket.db" onInit={createTables}>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </SQLiteProvider>
  );
}

export default App;