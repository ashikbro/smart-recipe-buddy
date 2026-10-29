"""Transparent recipe filtering and ranking."""

from dataclasses import dataclass


@dataclass(frozen=True)
class Recipe:
    name: str
    ingredients: frozenset[str]
    diets: frozenset[str]
    calories: int


def recommend(
    recipes: list[Recipe],
    available_ingredients: set[str],
    *,
    diet: str | None = None,
    max_calories: int | None = None,
) -> list[Recipe]:
    """Return recipes ranked by ingredient coverage, then calories."""
    if max_calories is not None and max_calories < 0:
        raise ValueError("max_calories cannot be negative")
    available = {ingredient.strip().casefold() for ingredient in available_ingredients}
    filtered = [
        recipe for recipe in recipes
        if (diet is None or diet.casefold() in {item.casefold() for item in recipe.diets})
        and (max_calories is None or recipe.calories <= max_calories)
    ]
    return sorted(
        filtered,
        key=lambda recipe: (
            -len({item.casefold() for item in recipe.ingredients} & available),
            recipe.calories,
            recipe.name.casefold(),
        ),
    )
