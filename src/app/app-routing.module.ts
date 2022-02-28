import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // lazy loading RecipesModule
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  // lazy loading ShoppingListModule
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  // lazy loading AuthModule
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // still lazy loading, but Angular will preload the bundles as soon as possible, to make sure that the subsequent navigation is sitll faster, while keeping the initial bundle size smaller.
      { preloadingStrategy: PreloadAllModules }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
