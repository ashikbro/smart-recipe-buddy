import * as tf from '@tensorflow/tfjs';
import * as ImagePicker from 'expo-image-picker';

export class ImageRecognitionService {
  private model: tf.GraphModel | null = null;
  private isModelLoaded = false;

  // Common food ingredients that can be recognized
  private readonly ingredientLabels = [
    'tomato', 'potato', 'onion', 'carrot', 'broccoli', 'lettuce',
    'cucumber', 'pepper', 'garlic', 'ginger', 'mushroom', 'spinach',
    'chicken', 'beef', 'pork', 'fish', 'egg', 'cheese', 'milk',
    'bread', 'rice', 'pasta', 'beans', 'corn', 'apple', 'banana',
    'orange', 'lemon', 'avocado', 'strawberry'
  ];

  async initializeModel(): Promise<void> {
    try {
      // Wait for TensorFlow to be ready
      await tf.ready();
      
      // For a production app, you would load a pre-trained model
      // For this demo, we'll use a simplified approach
      this.isModelLoaded = true;
      console.log('Model initialized successfully');
    } catch (error) {
      console.error('Error initializing model:', error);
      throw new Error('Failed to initialize image recognition model');
    }
  }

  async recognizeIngredients(imageUri: string): Promise<string[]> {
    if (!this.isModelLoaded) {
      await this.initializeModel();
    }

    try {
      // In a production app, this would:
      // 1. Load the image
      // 2. Preprocess it
      // 3. Run inference with the model
      // 4. Return the recognized ingredients
      
      // For this demo, we'll simulate ingredient recognition
      const recognizedIngredients = await this.simulateRecognition(imageUri);
      return recognizedIngredients;
    } catch (error) {
      console.error('Error recognizing ingredients:', error);
      throw new Error('Failed to recognize ingredients from image');
    }
  }

  private async simulateRecognition(imageUri: string): Promise<string[]> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a random subset of ingredients as a demo
    // In production, this would be replaced with actual model inference
    const numIngredients = Math.floor(Math.random() * 3) + 2; // 2-4 ingredients
    const shuffled = [...this.ingredientLabels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numIngredients);
  }

  async pickImage(): Promise<string | null> {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      return null;
    }
  }

  async takePicture(): Promise<string | null> {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        alert('Permission to access camera is required!');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }

      return null;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  }
}

export default new ImageRecognitionService();
