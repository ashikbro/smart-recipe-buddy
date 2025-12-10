import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageRecognitionService from '../services/ImageRecognitionService';
import { Ingredient } from '../types';

type ImageRecognitionScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

export default function ImageRecognitionScreen({
  navigation,
}: ImageRecognitionScreenProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [recognizedIngredients, setRecognizedIngredients] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTakePicture = async () => {
    const uri = await ImageRecognitionService.takePicture();
    if (uri) {
      setImageUri(uri);
      await processImage(uri);
    }
  };

  const handlePickImage = async () => {
    const uri = await ImageRecognitionService.pickImage();
    if (uri) {
      setImageUri(uri);
      await processImage(uri);
    }
  };

  const processImage = async (uri: string) => {
    setIsProcessing(true);
    try {
      const ingredients = await ImageRecognitionService.recognizeIngredients(uri);
      setRecognizedIngredients(ingredients);
    } catch (error) {
      Alert.alert('Error', 'Failed to recognize ingredients');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveIngredients = async () => {
    try {
      // Get existing ingredients
      const existingIngredientsJson = await AsyncStorage.getItem('ingredients');
      const existingIngredients: Ingredient[] = existingIngredientsJson
        ? JSON.parse(existingIngredientsJson)
        : [];

      // Add recognized ingredients
      const newIngredients: Ingredient[] = recognizedIngredients.map((name) => ({
        name,
      }));

      const allIngredients = [...existingIngredients, ...newIngredients];
      await AsyncStorage.setItem('ingredients', JSON.stringify(allIngredients));

      Alert.alert('Success', 'Ingredients added successfully!', [
        {
          text: 'Add More',
          onPress: () => navigation.navigate('Ingredients'),
        },
        {
          text: 'Generate Recipes',
          onPress: () => navigation.navigate('RecipeResults'),
        },
      ]);
    } catch (error) {
      console.error('Error saving ingredients:', error);
      Alert.alert('Error', 'Failed to save ingredients');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Scan Ingredients</Text>
        <Text style={styles.subtitle}>
          Use TensorFlow-powered image recognition to identify ingredients
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={handleTakePicture}>
            <Text style={styles.buttonText}>📷 Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
            <Text style={styles.buttonText}>🖼️ Choose from Gallery</Text>
          </TouchableOpacity>
        </View>

        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        {isProcessing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Analyzing image...</Text>
          </View>
        )}

        {recognizedIngredients.length > 0 && !isProcessing && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Recognized Ingredients:</Text>
            {recognizedIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>✓ {ingredient}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveIngredients}
            >
              <Text style={styles.saveButtonText}>Save Ingredients</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            1. Take a photo or select an image of your ingredients
          </Text>
          <Text style={styles.infoText}>
            2. Our TensorFlow model will identify the ingredients
          </Text>
          <Text style={styles.infoText}>
            3. Review and save the recognized ingredients
          </Text>
          <Text style={styles.infoText}>
            4. Generate personalized recipes based on what you have
          </Text>
        </View>
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
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  galleryButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ingredientItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 8,
    lineHeight: 20,
  },
});
