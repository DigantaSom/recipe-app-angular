import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private RECIPES_API_ENDPOINT: string =
    'https://ng-academind-recipe-app-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(this.RECIPES_API_ENDPOINT, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.RECIPES_API_ENDPOINT).pipe(
      map((recipes) =>
        recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }))
      ),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
