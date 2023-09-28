import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { MessagesComponent } from './messages/messages.component';
import { ArticlesComponent } from './articles/articles.component';
import {RouterLink} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleSearchComponent } from './article-search/article-search.component';
import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailsComponent,
    MessagesComponent,
    ArticlesComponent,
    DashboardComponent,
    ArticleSearchComponent
  ],
  imports: [

    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
