import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import TransactionScreen from './TransactionScreen';
import { TransactionProvider } from './TransactionContext';
import Beneficiary from './Beneficiary';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    {/* <Beneficiary></Beneficiary> */}
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Transaction" component={TransactionScreen} />
          <Stack.Screen name="Beneficiary" component={Beneficiary} />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
    </>
  );
};

export default App;
