import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DietaryPreferencesScreen from './src/screens/DietaryPreferencesScreen';
import IngredientsScreen from './src/screens/IngredientsScreen';
import ImageRecognitionScreen from './src/screens/ImageRecognitionScreen';
import RecipeResultsScreen from './src/screens/RecipeResultsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Smart Recipe Buddy' }}
        />
        <Stack.Screen
          name="DietaryPreferences"
          component={DietaryPreferencesScreen}
          options={{ title: 'Dietary Preferences' }}
        />
        <Stack.Screen
          name="Ingredients"
          component={IngredientsScreen}
          options={{ title: 'Add Ingredients' }}
        />
        <Stack.Screen
          name="ImageRecognition"
          component={ImageRecognitionScreen}
          options={{ title: 'Scan Ingredients' }}
        />
        <Stack.Screen
          name="RecipeResults"
          component={RecipeResultsScreen}
          options={{ title: 'Your Recipes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
