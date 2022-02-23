import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Veggie Grilled Cheese Tomato Soup',
  //     'Lazeeeeezz!!',
  //     'https://static.onecms.io/wp-content/uploads/sites/44/2021/02/18/veggie-grilled-cheese-tomato-soup.jpg',
  //     [new Ingredient('Cheese', 1), new Ingredient('Tomato', 2)]
  //   ),
  //   new Recipe(
  //     'Oven Baked Potato Chips',
  //     'Aha ha ha...',
  //     'https://static.onecms.io/wp-content/uploads/sites/23/2021/03/24/oven-baked-potato-chips-recipe.jpg',
  //     [new Ingredient('Potato', 5)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    // with slice(), we are returning a new array which is an exact copy of the above, so that we can't access the original recipes array stored in this service
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipesFromFirebase: Recipe[]): void {
    this.recipes = recipesFromFirebase;
    this.recipesChanged.next(this.recipes.slice());
  }
}
