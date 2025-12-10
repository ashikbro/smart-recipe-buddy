import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeService from '../services/RecipeService';
import CalorieCalculator from '../utils/CalorieCalculator';
import { Recipe, DietaryPreferences, HealthGoals, Ingredient } from '../types';

type RecipeResultsScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function RecipeResultsScreen({
  navigation,
}: RecipeResultsScreenProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  useEffect(() => {
    generateRecipes();
  }, []);

  const generateRecipes = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load user preferences
      const dietaryJson = await AsyncStorage.getItem('dietary');
      const healthGoalsJson = await AsyncStorage.getItem('healthGoals');
      const ingredientsJson = await AsyncStorage.getItem('ingredients');

      const dietary: DietaryPreferences = dietaryJson
        ? JSON.parse(dietaryJson)
        : {};
      const healthGoals: HealthGoals = healthGoalsJson
        ? JSON.parse(healthGoalsJson)
        : {};
      const ingredients: Ingredient[] = ingredientsJson
        ? JSON.parse(ingredientsJson)
        : [];

      if (ingredients.length === 0) {
        Alert.alert('Error', 'Please add some ingredients first', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Ingredients'),
          },
        ]);
        return;
      }

      // Generate recipes
      const generatedRecipes = await RecipeService.generateRecipes({
        dietary,
        healthGoals,
        ingredients,
      });

      setRecipes(generatedRecipes);
    } catch (err) {
      console.error('Error generating recipes:', err);
      setError(
        'Failed to generate recipes. Please check your API configuration and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecipe = (index: number) => {
    setExpandedRecipe(expandedRecipe === index ? null : index);
  };

  const handleStartOver = () => {
    navigation.navigate('Home');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>
            Generating personalized recipes with OpenAI...
          </Text>
          <Text style={styles.loadingSubtext}>This may take a moment</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={generateRecipes}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleStartOver}
          >
            <Text style={styles.secondaryButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Personalized Recipes</Text>
        <Text style={styles.subtitle}>
          Generated with OpenAI based on your preferences
        </Text>

        {recipes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No recipes generated. Please try again.
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={generateRecipes}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          recipes.map((recipe, index) => (
            <View key={index} style={styles.recipeCard}>
              <TouchableOpacity
                onPress={() => toggleRecipe(index)}
                style={styles.recipeHeader}
              >
                <View style={styles.recipeHeaderContent}>
                  <Text style={styles.recipeName}>{recipe.name}</Text>
                  <Text style={styles.recipeDescription}>{recipe.description}</Text>
                </View>
                <Text style={styles.expandIcon}>
                  {expandedRecipe === index ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>

              <View style={styles.recipeMetrics}>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Prep</Text>
                  <Text style={styles.metricValue}>{recipe.prepTime}</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Cook</Text>
                  <Text style={styles.metricValue}>{recipe.cookTime}</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Servings</Text>
                  <Text style={styles.metricValue}>{recipe.servings}</Text>
                </View>
              </View>

              <View style={styles.nutritionContainer}>
                <Text style={styles.nutritionTitle}>📊 Nutrition per serving:</Text>
                <Text style={styles.nutritionText}>
                  {CalorieCalculator.formatNutritionInfo({
                    calories: recipe.calories,
                    protein: recipe.protein,
                    carbs: recipe.carbs,
                    fat: recipe.fat,
                  })}
                </Text>
              </View>

              {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {recipe.dietaryTags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {expandedRecipe === index && (
                <View style={styles.recipeDetails}>
                  <Text style={styles.sectionTitle}>Ingredients:</Text>
                  {recipe.ingredients.map((ingredient, i) => (
                    <Text key={i} style={styles.ingredientText}>
                      • {ingredient}
                    </Text>
                  ))}

                  <Text style={styles.sectionTitle}>Instructions:</Text>
                  {recipe.instructions.map((instruction, i) => (
                    <Text key={i} style={styles.instructionText}>
                      {i + 1}. {instruction}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))
        )}

        <TouchableOpacity style={styles.startOverButton} onPress={handleStartOver}>
          <Text style={styles.startOverButtonText}>Create New Recipe</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingSubtext: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  recipeHeaderContent: {
    flex: 1,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  expandIcon: {
    fontSize: 20,
    color: '#4CAF50',
    marginLeft: 10,
  },
  recipeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    paddingVertical: 15,
    marginBottom: 15,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  nutritionContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  nutritionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 5,
  },
  nutritionText: {
    fontSize: 13,
    color: '#2E7D32',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  recipeDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startOverButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  startOverButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
