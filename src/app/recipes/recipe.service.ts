import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
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

  getRecipes() {
    // with slice(), we are returning a new array which is an exact copy of the above
    return this.recipes.slice();
  }
}
