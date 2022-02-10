import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Veggie Grilled Cheese Tomato Soup',
      'Lazeeeeezz!!',
      'https://static.onecms.io/wp-content/uploads/sites/44/2021/02/18/veggie-grilled-cheese-tomato-soup.jpg',
      [new Ingredient('Cheese', 1), new Ingredient('Tomato', 2)]
    ),
    new Recipe(
      'Oven Baked Potato Chips',
      'Aha ha ha...',
      'https://static.onecms.io/wp-content/uploads/sites/23/2021/03/24/oven-baked-potato-chips-recipe.jpg',
      [new Ingredient('Potato', 5)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    // with slice(), we are returning a new array which is an exact copy of the above, so that we can't access the original recipes array stored in this service
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }
}
