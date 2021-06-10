import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ToolbarComponent} from './toolbar/toolbar.component';

@NgModule({
    declarations: [
        MenuComponent,
        ToolbarComponent
    ],
    exports: [
        MenuComponent,
        ToolbarComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
