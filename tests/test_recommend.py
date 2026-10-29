import pytest

from recipe_buddy import Recipe, recommend


RECIPES = [
    Recipe("Lentil Bowl", frozenset({"lentils", "rice"}), frozenset({"vegan"}), 450),
    Recipe("Chicken Salad", frozenset({"chicken", "lettuce"}), frozenset({"keto"}), 350),
]


def test_recommendation_filters_and_ranks_by_available_ingredients():
    result = recommend(RECIPES, {"rice", "lentils"}, diet="vegan")
    assert [recipe.name for recipe in result] == ["Lentil Bowl"]


def test_calorie_limit_and_validation():
    assert recommend(RECIPES, set(), max_calories=400)[0].name == "Chicken Salad"
    with pytest.raises(ValueError):
        recommend(RECIPES, set(), max_calories=-1)
