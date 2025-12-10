export interface DietaryPreferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  keto: boolean;
  lowCarb: boolean;
  lowFat: boolean;
  highProtein: boolean;
}

export interface HealthGoals {
  weightLoss: boolean;
  muscleGain: boolean;
  heartHealth: boolean;
  diabetesFriendly: boolean;
  energyBoost: boolean;
}

export interface Ingredient {
  name: string;
  quantity?: string;
  unit?: string;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  dietaryTags: string[];
}

export interface UserPreferences {
  dietary: DietaryPreferences;
  healthGoals: HealthGoals;
  ingredients: Ingredient[];
}
