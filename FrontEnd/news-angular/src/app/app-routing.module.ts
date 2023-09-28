import { NgModule } from '@angular/core';
import {ArticlesComponent} from "./articles/articles.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{path: 'articles', component: ArticlesComponent}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
