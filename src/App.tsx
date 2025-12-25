import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddRecord from './components/AddRecord';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Dashboard: undefined;
  AddRecord: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
      } catch (err) {
        console.error('Auth check failed', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null; // or a splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="AddRecord" component={AddRecord} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
