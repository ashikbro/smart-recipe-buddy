import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DietaryPreferences, HealthGoals } from '../types';

type DietaryPreferencesScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function DietaryPreferencesScreen({
  navigation,
}: DietaryPreferencesScreenProps) {
  const [dietary, setDietary] = useState<DietaryPreferences>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    keto: false,
    lowCarb: false,
    lowFat: false,
    highProtein: false,
  });

  const [healthGoals, setHealthGoals] = useState<HealthGoals>({
    weightLoss: false,
    muscleGain: false,
    heartHealth: false,
    diabetesFriendly: false,
    energyBoost: false,
  });

  const toggleDietary = (key: keyof DietaryPreferences) => {
    setDietary((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleHealthGoal = (key: keyof HealthGoals) => {
    setHealthGoals((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('dietary', JSON.stringify(dietary));
      await AsyncStorage.setItem('healthGoals', JSON.stringify(healthGoals));
      navigation.navigate('Ingredients');
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Dietary Preferences</Text>
        <Text style={styles.sectionSubtitle}>
          Select your dietary restrictions
        </Text>

        <View style={styles.optionsContainer}>
          {Object.entries(dietary).map(([key, value]) => (
            <View key={key} style={styles.optionRow}>
              <Text style={styles.optionLabel}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
              <Switch
                value={value}
                onValueChange={() => toggleDietary(key as keyof DietaryPreferences)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={value ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Health Goals</Text>
        <Text style={styles.sectionSubtitle}>
          What are your health objectives?
        </Text>

        <View style={styles.optionsContainer}>
          {Object.entries(healthGoals).map(([key, value]) => (
            <View key={key} style={styles.optionRow}>
              <Text style={styles.optionLabel}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Text>
              <Switch
                value={value}
                onValueChange={() => toggleHealthGoal(key as keyof HealthGoals)}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={value ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue to Ingredients</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
