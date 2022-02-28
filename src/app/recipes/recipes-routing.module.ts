import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesResolverService } from './recipes-resolver.service';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const recipeRoutes: Routes = [
  {
    // path: 'recipes',
    path: '', // to lazy load RecipesModule
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipeRoutes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
