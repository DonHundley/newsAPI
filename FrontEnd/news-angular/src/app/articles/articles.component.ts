import {Component, OnInit} from '@angular/core';

import { Article } from "../article";
import { NewsService} from "../news.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{

  articles: Article[] = [];

  constructor(private newsService: NewsService) {
  }
  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.newsService.getArticles().subscribe(articles => this.articles = articles);
  }

  add(headline: string, author: string, body: string, imgUrl: string): void {
    headline = headline.trim();
    author = author.trim();
    body = body.trim();
    imgUrl = imgUrl.trim();

    if(!headline || !author || !body || !imgUrl){return;}
    this.newsService.addArticle({ headline, author, imgUrl, body} as Article)
      .subscribe(article =>{this.articles.push(article)}
      );
  }

  delete(article: Article) {
    this.articles = this.articles.filter(a => a !== article);
    this.newsService.deleteArticle(article.id).subscribe();
  }
}
