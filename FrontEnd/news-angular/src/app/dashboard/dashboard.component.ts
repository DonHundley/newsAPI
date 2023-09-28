import {Component, OnInit} from '@angular/core';
import {Article} from "../article";
import {NewsService} from "../news.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  articles: Article[] = [];

  constructor(private newsSerivce: NewsService) {
  }
  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.newsSerivce.getArticles()
      .subscribe(articles => this.articles = articles.slice(articles.length - 5, articles.length - 1));
  }

}
