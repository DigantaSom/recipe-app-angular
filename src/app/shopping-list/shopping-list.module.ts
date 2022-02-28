import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

const shoppingListRoutes: Routes = [
  {
    // path: 'shopping-list',
    path: '', // to lazy load ShoppingListModule
    component: ShoppingListComponent,
  },
];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    // CommonModule,
    FormsModule,
    RouterModule.forChild(shoppingListRoutes),
    SharedModule,
  ],
})
export class ShoppingListModule {}
