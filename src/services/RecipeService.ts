import axios from 'axios';
import { UserPreferences, Recipe } from '../types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export class RecipeService {
  private apiKey: string;

  constructor(apiKey: string = OPENAI_API_KEY) {
    if (!apiKey) {
      console.warn('WARNING: OpenAI API key is not configured. Recipe generation will fail. Please set OPENAI_API_KEY in your .env file.');
    }
    this.apiKey = apiKey;
  }

  async generateRecipes(preferences: UserPreferences): Promise<Recipe[]> {
    try {
      const prompt = this.buildPrompt(preferences);

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a professional chef and nutritionist. Generate healthy, delicious recipes based on user preferences. Always return valid JSON format.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const recipes = this.parseRecipeResponse(content);
      return recipes;
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw new Error('Failed to generate recipes. Please check your API key and try again.');
    }
  }

  private buildPrompt(preferences: UserPreferences): string {
    const { dietary, healthGoals, ingredients } = preferences;

    const dietaryRestrictions = Object.entries(dietary)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(', ');

    const goals = Object.entries(healthGoals)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(', ');

    const ingredientList = ingredients.map((i) => i.name).join(', ');

    return `Generate 3 unique recipes with the following requirements:
- Dietary restrictions: ${dietaryRestrictions || 'None'}
- Health goals: ${goals || 'General health'}
- Available ingredients: ${ingredientList}

For each recipe, provide:
1. Recipe name
2. Brief description
3. Complete list of ingredients (use the available ingredients when possible)
4. Step-by-step instructions
5. Preparation time
6. Cooking time
7. Number of servings
8. Nutritional information (calories, protein, carbs, fat per serving)
9. Relevant dietary tags

Return the response as a JSON array of recipes in this format:
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
]`;
  }

  private parseRecipeResponse(content: string): Recipe[] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recipes = JSON.parse(jsonMatch[0]);
        return recipes;
      }
      
      // If no JSON found, return empty array
      return [];
    } catch (error) {
      console.error('Error parsing recipe response:', error);
      return [];
    }
  }
}

export default new RecipeService();
