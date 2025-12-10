export class CalorieCalculator {
  // Calculate total daily energy expenditure (TDEE)
  static calculateTDEE(
    weight: number, // in kg
    height: number, // in cm
    age: number,
    gender: 'male' | 'female',
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  ): number {
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    return Math.round(bmr * activityMultipliers[activityLevel]);
  }

  // Calculate macronutrient targets based on health goals
  static calculateMacros(
    calories: number,
    goal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'heart_health'
  ): { protein: number; carbs: number; fat: number } {
    let proteinPercent: number;
    let carbsPercent: number;
    let fatPercent: number;

    switch (goal) {
      case 'weight_loss':
        proteinPercent = 0.35;
        carbsPercent = 0.35;
        fatPercent = 0.3;
        break;
      case 'muscle_gain':
        proteinPercent = 0.35;
        carbsPercent = 0.45;
        fatPercent = 0.2;
        break;
      case 'heart_health':
        proteinPercent = 0.25;
        carbsPercent = 0.45;
        fatPercent = 0.3;
        break;
      case 'maintenance':
      default:
        proteinPercent = 0.3;
        carbsPercent = 0.4;
        fatPercent = 0.3;
        break;
    }

    return {
      protein: Math.round((calories * proteinPercent) / 4), // 4 cal per gram
      carbs: Math.round((calories * carbsPercent) / 4), // 4 cal per gram
      fat: Math.round((calories * fatPercent) / 9), // 9 cal per gram
    };
  }

  // Calculate recipe nutrition per serving
  static calculateRecipeNutrition(
    ingredients: Array<{ name: string; calories: number; protein: number; carbs: number; fat: number }>,
    servings: number
  ): { calories: number; protein: number; carbs: number; fat: number } {
    const totals = ingredients.reduce(
      (acc, ingredient) => ({
        calories: acc.calories + ingredient.calories,
        protein: acc.protein + ingredient.protein,
        carbs: acc.carbs + ingredient.carbs,
        fat: acc.fat + ingredient.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    return {
      calories: Math.round(totals.calories / servings),
      protein: Math.round(totals.protein / servings),
      carbs: Math.round(totals.carbs / servings),
      fat: Math.round(totals.fat / servings),
    };
  }

  // Get calorie recommendations based on goal
  static getCalorieRecommendation(
    tdee: number,
    goal: 'weight_loss' | 'muscle_gain' | 'maintenance'
  ): number {
    switch (goal) {
      case 'weight_loss':
        return Math.round(tdee * 0.8); // 20% deficit
      case 'muscle_gain':
        return Math.round(tdee * 1.1); // 10% surplus
      case 'maintenance':
      default:
        return tdee;
    }
  }

  // Format nutrition info for display
  static formatNutritionInfo(nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }): string {
    return `Calories: ${nutrition.calories} | Protein: ${nutrition.protein}g | Carbs: ${nutrition.carbs}g | Fat: ${nutrition.fat}g`;
  }
}

export default CalorieCalculator;
