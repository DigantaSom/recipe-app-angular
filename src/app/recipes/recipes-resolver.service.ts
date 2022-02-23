import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes: Recipe[] = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      // we're not subscribing here manually, because the resolve() method will do that for us
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}

/*
  Note: This resolver is created because we were getting an error while refreshing the recipe-detail and recipe-edit component pages, as we weren't fetching recipes there explicitely there.
  Now with this resolver, we made sure that recipes will always be fetched before a component (where we have applied this resolver in the app-routing module) gets loaded.
*/
