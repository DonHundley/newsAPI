import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Article } from '../article';
import { NewsService } from '../news.service';
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: Article | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }
  
  getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.newsService.getArticle(id)
      .subscribe(article => this.article = article);
  }
  
  save(): void {
    if (this.article) {
      this.newsService.updateArticle(this.article)
        .subscribe(() => this.goBack());
    }
  }
  
  goBack(): void {
    this.location.back();
  }
}
