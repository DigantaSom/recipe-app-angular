import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Veggie Grilled Cheese Tomato Soup',
      'This is simply a test.',
      'https://static.onecms.io/wp-content/uploads/sites/44/2021/02/18/veggie-grilled-cheese-tomato-soup.jpg'
    ),
    new Recipe(
      'Oven Baked Potato Chips',
      'This is another test.',
      'https://static.onecms.io/wp-content/uploads/sites/23/2021/03/24/oven-baked-potato-chips-recipe.jpg'
    ),
  ];

  constructor() {}

  getRecipes(): Recipe[] {
    // with slice(), we are returning a new array which is an exact copy of the above, so that we can't access the original recipes array stored in this service
    return this.recipes.slice();
  }
}
