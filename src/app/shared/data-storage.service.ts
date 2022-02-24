import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, take, exhaustMap } from 'rxjs';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private RECIPES_API_ENDPOINT: string =
    'https://ng-academind-recipe-app-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes(): void {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http
      .put<Recipe[]>(this.RECIPES_API_ENDPOINT, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  // fetchRecipes(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(this.API_ENDPOINT).pipe(
  //     map((recipes) =>
  //       recipes.map((recipe) => ({
  //         ...recipe,
  //         ingredients: recipe.ingredients ? recipe.ingredients : [],
  //       }))
  //     ),
  //     tap((recipes) => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }

  fetchRecipes(): Observable<Recipe[]> {
    // We wanna take only one value from this observable, then immediately unsubscribe form it.
    // exhaustMap() waits for the first (user) observable to get completed, then it gives us that user.
    // Then the higher-order observable (user) will be replaced by the lower-order observable (http.get())
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.RECIPES_API_ENDPOINT, {
          params: new HttpParams().set('auth', user.token),
        });
      }),
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
