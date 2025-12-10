import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NutritionDisplayProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servings?: number;
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({
  calories,
  protein,
  carbs,
  fat,
  servings = 1,
}) => {
  const perServing = servings > 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nutritional Information {perServing && `(per serving)`}
      </Text>
      
      <View style={styles.nutritionGrid}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{calories}</Text>
          <Text style={styles.nutritionLabel}>Calories</Text>
          <View style={[styles.progressBar, { width: '100%', backgroundColor: '#FF6B6B' }]} />
        </View>

        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{protein}g</Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
          <View style={[styles.progressBar, { width: '100%', backgroundColor: '#4ECDC4' }]} />
        </View>

        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{carbs}g</Text>
          <Text style={styles.nutritionLabel}>Carbs</Text>
          <View style={[styles.progressBar, { width: '100%', backgroundColor: '#95E1D3' }]} />
        </View>

        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{fat}g</Text>
          <Text style={styles.nutritionLabel}>Fat</Text>
          <View style={[styles.progressBar, { width: '100%', backgroundColor: '#F38181' }]} />
        </View>
      </View>

      {perServing && (
        <Text style={styles.totalServings}>Total Servings: {servings}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  nutritionItem: {
    flex: 1,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  totalServings: {
    marginTop: 15,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default NutritionDisplay;
