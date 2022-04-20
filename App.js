import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <SafeAreaView style={{flex : 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown : false, animation : 'slide_from_right'}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
