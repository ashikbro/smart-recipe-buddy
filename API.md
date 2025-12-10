# API Integration Guide

## OpenAI Integration

### Setup

The app uses OpenAI's GPT-3.5-turbo model for recipe generation.

**File**: `src/services/RecipeService.ts`

### Configuration

```typescript
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
```

### Usage

```typescript
import RecipeService from './services/RecipeService';

const recipes = await RecipeService.generateRecipes({
  dietary: { vegetarian: true, glutenFree: true },
  healthGoals: { weightLoss: true },
  ingredients: [
    { name: 'chicken breast' },
    { name: 'broccoli' },
    { name: 'olive oil' }
  ]
});
```

### API Response Format

The service expects recipes in JSON format:

```json
[
  {
    "name": "Recipe Name",
    "description": "Brief description",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "instructions": ["step 1", "step 2"],
    "prepTime": "15 mins",
    "cookTime": "30 mins",
    "servings": 4,
    "calories": 350,
    "protein": 25,
    "carbs": 40,
    "fat": 12,
    "dietaryTags": ["vegetarian", "high-protein"]
  }
]
```

### Error Handling

The service includes comprehensive error handling:
- API key validation
- Network error handling
- JSON parsing error handling
- User-friendly error messages

### Cost Optimization

Tips to minimize API costs:
1. Cache generated recipes
2. Implement request throttling
3. Set reasonable token limits
4. Use temperature setting to balance creativity and consistency

## TensorFlow.js Integration

### Setup

The app uses TensorFlow.js for ingredient image recognition.

**File**: `src/services/ImageRecognitionService.ts`

### Initialization

```typescript
await ImageRecognitionService.initializeModel();
```

### Image Recognition

```typescript
const ingredients = await ImageRecognitionService.recognizeIngredients(imageUri);
// Returns: ['tomato', 'onion', 'garlic']
```

### Supported Ingredients

The service can recognize:
- Vegetables: tomato, potato, onion, carrot, broccoli, lettuce, cucumber, pepper, etc.
- Proteins: chicken, beef, pork, fish, egg, cheese, milk
- Grains: bread, rice, pasta, beans, corn
- Fruits: apple, banana, orange, lemon, avocado, strawberry

### Camera Integration

```typescript
// Take a photo
const imageUri = await ImageRecognitionService.takePicture();

// Pick from gallery
const imageUri = await ImageRecognitionService.pickImage();
```

### Model Configuration

For production use:
1. Train a custom TensorFlow model on food images
2. Convert the model to TensorFlow.js format
3. Host the model files
4. Update the service to load your model

### Performance Tips

- Preload the model on app startup
- Resize images before processing
- Use appropriate model complexity for mobile devices
- Cache recognition results

## Calorie Calculator API

### Setup

**File**: `src/utils/CalorieCalculator.ts`

### Calculate TDEE

Total Daily Energy Expenditure:

```typescript
const tdee = CalorieCalculator.calculateTDEE(
  70,        // weight in kg
  175,       // height in cm
  30,        // age
  'male',    // gender
  'moderate' // activity level
);
// Returns: 2547 (calories per day)
```

### Calculate Macros

```typescript
const macros = CalorieCalculator.calculateMacros(
  2000,         // daily calories
  'weight_loss' // goal
);
// Returns: { protein: 175, carbs: 175, fat: 67 }
```

### Recipe Nutrition

```typescript
const nutrition = CalorieCalculator.calculateRecipeNutrition(
  [
    { name: 'chicken', calories: 200, protein: 40, carbs: 0, fat: 4 },
    { name: 'rice', calories: 150, protein: 3, carbs: 35, fat: 0 }
  ],
  4 // servings
);
// Returns: { calories: 88, protein: 11, carbs: 9, fat: 1 }
```

### Activity Levels

- `sedentary`: Little or no exercise (1.2x multiplier)
- `light`: Light exercise 1-3 days/week (1.375x)
- `moderate`: Moderate exercise 3-5 days/week (1.55x)
- `active`: Hard exercise 6-7 days/week (1.725x)
- `very_active`: Very hard exercise, physical job (1.9x)

### Health Goals

- `weight_loss`: 20% calorie deficit
- `muscle_gain`: 10% calorie surplus
- `maintenance`: No deficit or surplus
- `heart_health`: Balanced macros with healthy fats

## Data Storage

### AsyncStorage

The app uses React Native's AsyncStorage for local data persistence.

### Stored Data

```typescript
// Dietary preferences
await AsyncStorage.setItem('dietary', JSON.stringify(dietary));

// Health goals
await AsyncStorage.setItem('healthGoals', JSON.stringify(healthGoals));

// Ingredients
await AsyncStorage.setItem('ingredients', JSON.stringify(ingredients));
```

### Retrieving Data

```typescript
const dietaryJson = await AsyncStorage.getItem('dietary');
const dietary = dietaryJson ? JSON.parse(dietaryJson) : {};
```

## Security Best Practices

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Use `.env` files for sensitive data
3. **HTTPS**: All API requests use HTTPS
4. **Input Validation**: Validate all user inputs
5. **Error Messages**: Don't expose sensitive info in error messages

## Rate Limiting

To prevent abuse and manage costs:

```typescript
// Implement request throttling
const rateLimiter = {
  lastRequest: 0,
  minInterval: 1000, // 1 second between requests
  
  async checkLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.minInterval) {
      const waitTime = this.minInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequest = Date.now();
  }
};
```

## Testing

### Mock Services

For testing without API calls:

```typescript
// Mock RecipeService
const mockRecipes = [
  {
    name: "Test Recipe",
    description: "Test description",
    // ... other fields
  }
];

RecipeService.generateRecipes = jest.fn().mockResolvedValue(mockRecipes);
```

## Future Enhancements

1. **Caching**: Implement Redis or similar for recipe caching
2. **Offline Mode**: Store recipes for offline access
3. **Custom Models**: Train domain-specific TensorFlow models
4. **Real-time Sync**: Firebase integration for multi-device sync
5. **Analytics**: Track usage patterns and popular recipes
