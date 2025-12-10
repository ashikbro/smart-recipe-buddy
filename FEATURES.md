# Features Documentation

## Overview

Smart Recipe Buddy is a comprehensive mobile recipe assistant that helps users discover personalized recipes based on their dietary needs, available ingredients, and health goals.

## Core Features

### 1. Dietary Preferences Management

**Location**: `src/screens/DietaryPreferencesScreen.tsx`

Users can specify their dietary restrictions:
- 🌱 Vegetarian
- 🌿 Vegan
- 🌾 Gluten-Free
- 🥛 Dairy-Free
- 🥑 Keto
- 🍚 Low-Carb
- 🥗 Low-Fat
- 💪 High-Protein

**How it works**:
1. Users toggle switches to enable/disable dietary preferences
2. Preferences are saved to AsyncStorage
3. Preferences are used to filter and generate appropriate recipes

### 2. Health Goals Tracking

**Location**: `src/screens/DietaryPreferencesScreen.tsx`

Users can set their health objectives:
- 📉 Weight Loss
- 💪 Muscle Gain
- ❤️ Heart Health
- 🩺 Diabetes-Friendly
- ⚡ Energy Boost

**How it works**:
1. Users select their health goals
2. Goals influence recipe selection and nutritional targets
3. Calorie and macro recommendations are adjusted accordingly

### 3. Ingredient Management

**Location**: `src/screens/IngredientsScreen.tsx`

Users can add ingredients they have available:
- Manual entry with name, quantity, and unit
- Quick ingredient addition
- Remove ingredients with one tap
- Visual list of all added ingredients

**How it works**:
1. Users type ingredient names and optional quantities
2. Ingredients are added to a list
3. List is saved for recipe generation
4. Can also add ingredients via image recognition

### 4. Image Recognition (TensorFlow.js)

**Location**: `src/screens/ImageRecognitionScreen.tsx` and `src/services/ImageRecognitionService.ts`

AI-powered ingredient identification:
- 📷 Take photo with camera
- 🖼️ Choose from gallery
- 🤖 Automatic ingredient detection
- ✓ Review and save recognized ingredients

**Supported Ingredients**:
- **Vegetables**: tomato, potato, onion, carrot, broccoli, lettuce, cucumber, pepper, garlic, ginger, mushroom, spinach
- **Proteins**: chicken, beef, pork, fish, egg, cheese, milk
- **Grains**: bread, rice, pasta, beans, corn
- **Fruits**: apple, banana, orange, lemon, avocado, strawberry

**How it works**:
1. User takes a photo or selects from gallery
2. TensorFlow.js processes the image
3. Ingredients are identified and displayed
4. User can save to their ingredient list

**Technical Details**:
- Uses `@tensorflow/tfjs` and `@tensorflow/tfjs-react-native`
- Expo Camera and Image Picker for image capture
- Async processing with loading states
- Error handling for failed recognition

### 5. AI Recipe Generation (OpenAI)

**Location**: `src/services/RecipeService.ts`

OpenAI-powered personalized recipe creation:
- Considers dietary restrictions
- Factors in health goals
- Uses available ingredients
- Generates 3 unique recipes per request

**Recipe Information Includes**:
- 📝 Recipe name and description
- 🥘 Complete ingredient list
- 📋 Step-by-step instructions
- ⏱️ Prep and cook times
- 👥 Serving size
- 📊 Nutritional information
- 🏷️ Dietary tags

**How it works**:
1. User preferences and ingredients are collected
2. A detailed prompt is constructed
3. OpenAI GPT-3.5-turbo generates recipes
4. Response is parsed and validated
5. Recipes are displayed with full details

**API Integration**:
- Uses OpenAI Chat Completions API
- Temperature: 0.7 for balanced creativity
- Max tokens: 2000 for comprehensive recipes
- JSON response format for structured data

### 6. Calorie Calculator

**Location**: `src/utils/CalorieCalculator.ts`

Comprehensive nutrition calculation system:

#### TDEE Calculation
Calculate Total Daily Energy Expenditure:
- Based on Mifflin-St Jeor Equation
- Factors: weight, height, age, gender
- Activity level multipliers
- Returns daily calorie needs

**Activity Levels**:
- Sedentary (1.2x)
- Light (1.375x)
- Moderate (1.55x)
- Active (1.725x)
- Very Active (1.9x)

#### Macro Calculation
Calculate protein, carbs, and fat targets:
- Customized for health goals
- Weight loss: 35% protein, 35% carbs, 30% fat
- Muscle gain: 35% protein, 45% carbs, 20% fat
- Heart health: 25% protein, 45% carbs, 30% fat
- Maintenance: 30% protein, 40% carbs, 30% fat

#### Recipe Nutrition
Per-serving nutritional breakdown:
- Total calories
- Protein in grams
- Carbohydrates in grams
- Fat in grams

**How it works**:
1. Ingredient nutritional data is aggregated
2. Values are divided by serving size
3. Results are rounded for display
4. Formatted for easy reading

### 7. Recipe Display & Details

**Location**: `src/screens/RecipeResultsScreen.tsx`

Rich recipe viewing experience:
- 📱 Card-based layout
- 🔽 Expandable recipe details
- 📊 Nutritional information prominently displayed
- 🏷️ Visual dietary tags
- ⏱️ Quick metrics (prep, cook, servings)

**Features**:
- Tap to expand/collapse recipe details
- Color-coded nutrition display
- Full ingredient lists
- Step-by-step instructions
- Easy-to-read formatting

### 8. Navigation & User Flow

**Location**: `App.tsx`

Smooth navigation experience:
- Stack-based navigation
- Consistent header styling
- Back navigation support
- Clear screen titles

**Navigation Flow**:
```
Home → Dietary Preferences → Ingredients → Recipe Results
  ↓
Image Recognition → (saves to ingredients)
```

### 9. Data Persistence

**Technology**: React Native AsyncStorage

**Stored Data**:
- Dietary preferences
- Health goals
- Ingredient lists
- User settings

**Benefits**:
- Instant app startup
- Offline access to preferences
- No account required
- Privacy-focused (local storage)

### 10. Responsive Design

All screens are optimized for:
- Various screen sizes
- Portrait and landscape orientations
- iOS and Android devices
- Different pixel densities

**Design Elements**:
- ScrollView for long content
- SafeAreaView for notch compatibility
- Flexible layouts with flexbox
- Consistent spacing and padding
- Accessible touch targets

## User Experience Features

### Visual Feedback
- Loading indicators during processing
- Success/error messages
- Smooth transitions
- Clear button states

### Error Handling
- Graceful API failure handling
- User-friendly error messages
- Retry mechanisms
- Fallback behaviors

### Accessibility
- Clear labels and descriptions
- High contrast text
- Readable font sizes
- Intuitive icons and emojis

## Performance Optimizations

- Async/await for non-blocking operations
- Efficient state management
- Image optimization
- Lazy loading where appropriate
- Minimal re-renders

## Future Enhancement Opportunities

1. **Recipe Saving**: Bookmark favorite recipes
2. **Shopping Lists**: Generate shopping lists from recipes
3. **Meal Planning**: Weekly meal planning feature
4. **Social Sharing**: Share recipes with friends
5. **Nutritional Tracking**: Daily nutrition logging
6. **Recipe Ratings**: User reviews and ratings
7. **Custom Ingredients**: Add custom ingredients with nutritional data
8. **Serving Adjustments**: Dynamically adjust serving sizes
9. **Unit Conversions**: Convert between measurement units
10. **Voice Input**: Voice-to-text for hands-free input
11. **Barcode Scanning**: Scan product barcodes for ingredients
12. **Recipe Import**: Import recipes from URLs
13. **Cooking Timer**: Built-in timers for recipes
14. **Substitutions**: Suggest ingredient substitutions
15. **Cost Estimation**: Estimate recipe costs

## Technical Features

### TypeScript Support
- Full type safety
- IntelliSense support
- Catch errors at compile time
- Better code documentation

### Modern React Patterns
- Functional components
- React Hooks
- Clean component structure
- Separation of concerns

### Service Architecture
- Modular service design
- Easy to test and maintain
- Clear API boundaries
- Reusable components

### Environment Configuration
- Secure API key management
- Environment-specific settings
- Easy deployment configuration

## Security Features

- API keys in environment variables
- No sensitive data in source control
- HTTPS for all API requests
- Input validation
- Error message sanitization

---

**Note**: This is a comprehensive feature implementation that can be extended and customized based on specific requirements and user feedback.
