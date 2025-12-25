import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddRecord from './components/AddRecord';

// Import your custom screens
export type RootStackParamList = {
  Register: undefined;
  Dashboard: { userEmail: string }; // Example of passing parameters
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Hide headers for a custom "Vault" look
          animation: 'slide_from_right' // Smooth modern transition
        }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddRecord" component={AddRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;